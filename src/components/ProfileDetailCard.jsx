import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import {
  fetchOtherUser,
  followUnfollow,
  otherUserPostDetails,
} from '../features/otherUser/otherUserRequest';
import {
  clearState,
  selectOtherUser,
  selectOtherUserPostDetails,
} from '../features/otherUser/otherUserSlice';
import { selectAuth } from '../features/userSlice';
import Button from './Button';

const ProfileDetailCard = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [postLoading, setPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const auth = useSelector(selectAuth);

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (postLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [postLoading, hasMore]
  );

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await dispatch(fetchOtherUser({ token: auth.token, userName: userName }));
      setLoading(false);
    };

    if (auth.token) {
      fetchUser();
    }
  }, [dispatch, auth.token, userName]);

  const otherUser = useSelector(selectOtherUser);

  const postDetailsHandler = () => {
    setDrawer((prevDrawer) => !prevDrawer);
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      setPostLoading(true);
      await dispatch(
        otherUserPostDetails({
          token: auth.token,
          page: 1,
          limit: 9,
          _id: otherUser.user._id,
        })
      );
      setPostLoading(false);
    };

    if (auth.token && drawer) {
      fetchPostDetails();
    }
  }, [dispatch, auth.token, page, otherUser.user._id, drawer]);

  const posts = useSelector(selectOtherUserPostDetails);

  useEffect(() => {
    setHasMore(posts.length > 0 && posts.length % 9 === 0);
  }, [posts]);

  const followHandler = () => {
    console.log('Follow function triggered');
    const followFunction = async () => {
      setLoading(true);
      await dispatch(
        followUnfollow({
          token: auth.token,
          Id: otherUser.user._id,
        })
      );
      setLoading(false);
    };

    if (auth.token) {
      followFunction();
    }
  };

  //clear the state  whenever the user navigate  to other page
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return (
    <div className='w-full bg-[#ffffff] rounded-lg p-8 text-gray-400'>
      <div className='flex space-x-8'>
        <img
          src={otherUser?.user.avatar}
          alt='profile-photo'
          className='rounded-full w-48 h-48 object-cover'
        />
        <div className='space-y-8 w-full'>
          <p className='text-black font-bold text-5xl text-start'>
            {otherUser?.user.userName}
          </p>
          <div className='flex justify-between text-xl font-semibold'>
            <span>{otherUser?.user.posts.length} Posts</span>
            <span>{otherUser?.followers} Followers</span>
            <span>{otherUser?.following} Following</span>
          </div>
          <div>
            <div className='flex justify-between'>
              <p className='text-xl'>{otherUser?.user.name}</p>
              <div className='w-30'>
                {otherUser?.followingStatus === false ? (
                  <Button children='Follow' onClick={followHandler}></Button>
                ) : (
                  <Button children='Following' onClick={followHandler}></Button>
                )}
              </div>
            </div>
            <span className='text-lg'>{otherUser?.user.bio || 'Bio'}</span>
          </div>
        </div>
      </div>
      <hr className='my-8' />
      <div>
        <Button
          children={drawer ? 'hide Posts' : 'See Posts'}
          onClick={postDetailsHandler}
        />
      </div>
      <div className='p-2'>
        {drawer && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
              {posts &&
                posts.map((post, index) => {
                  if (posts.length === index + 1) {
                    return (
                      <div key={post.id} ref={lastPostElementRef}>
                        <img
                          src={post.content}
                          alt={post.description}
                          className='w-full h-48 object-cover rounded-lg'
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={post.id}>
                        <img
                          src={post.content}
                          alt={post.description}
                          className='w-full h-48 object-cover rounded-lg'
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </>
        )}
        {loading && (
          <div className='w-full flex justify-center items-center mt-4'>
            <ClipLoader color={'#000'} loading={loading} size={35} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailCard;
