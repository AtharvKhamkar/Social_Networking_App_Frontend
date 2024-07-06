import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import PostCard from '../components/PostCard';
import SuggestedFriendCard from '../components/SuggestedFriendCard';
import UploadPost from '../components/UploadPost';
import UserProfileCard from '../components/UserProfileCard';
import { getUserFeed } from '../features/postRequest';
import { userprofile } from '../features/userRequest';
import {
  selectAuth,
  selectUserPosts,
  selectUserProfile,
} from '../features/userSlice';
import ShimmerHomePage from '../components/ShimmerHomePage';

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = auth.user;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
    const fetchData = async () => {
      setPostLoading(true);
      await dispatch(getUserFeed({ page, limit: 5, token: auth.token }));
      setPostLoading(false);
    };

    if (auth.token) {
      fetchData();
    }
  }, [dispatch, auth.token, page]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      await dispatch(userprofile({ token: auth.token }));
      setLoading(false);
    };

    if (auth.token) {
      fetchUserProfile();
    }
  }, [dispatch, auth.token]);

  const userPostsInfo = useSelector(selectUserPosts);
  const userProfile = useSelector(selectUserProfile);
  console.log(userProfile);
  const userPosts = userPostsInfo.docs;

  useEffect(() => {
    setHasMore(userPostsInfo?.page < userPostsInfo?.totalPages);
  }, [userPostsInfo]);

  if (loading) {
    return <ShimmerHomePage />;
  }

  return (
    <div className='flex w-full min-h-screen bg-[#eeeeee] font-roboto gap-16 px-32 py-8'>
      <div className='w-1/3'>
        {userProfile ? (
          <UserProfileCard children={userProfile} />
        ) : (
          <p>Loading User profile</p>
        )}
      </div>
      <div className='w-2/3 flex flex-col gap-8'>
        <UploadPost token={auth.token} userPic={auth?.user?.user?.avatar} />
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post, index) => {
            if (userPosts.length === index + 1) {
              return (
                <PostCard
                  ref={lastPostElementRef}
                  key={index}
                  post={post}
                  avatar={user.user.avatar}
                />
              );
            } else {
              return (
                <PostCard key={index} post={post} avatar={user.user.avatar} />
              );
            }
          })
        ) : (
          <p>No posts are available!</p>
        )}
        {postLoading && (
          <div className='flex justify-center items-center mt-4'>
            <ClipLoader color={'#000'} loading={postLoading} size={35} />
          </div>
        )}
      </div>
      <div className='w-1/3 space-y-5'>
        {user ? <SuggestedFriendCard token={auth.token} /> : <p>Loading</p>}
      </div>
    </div>
  );
};

export default HomePage;
