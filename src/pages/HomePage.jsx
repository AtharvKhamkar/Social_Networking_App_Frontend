import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import UserProfileCard from '../components/UserProfileCard';
import { getUserPost } from '../features/postRequest';
import { selectAuth, selectUserPosts } from '../features/userSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = auth.user;

  useEffect(() => {
    const fetchUserPost = async () => {
      await dispatch(getUserPost({ page: 1, limit: 5, token: auth.token }));
    };

    if (auth.token) {
      fetchUserPost();
    }
  }, [dispatch, auth.token]);

  const userPostsInfo = useSelector(selectUserPosts);
  const userPosts = userPostsInfo.docs;

  return (
    <div className='flex w-full min-h-screen bg-[#eeeeee] font-roboto gap-16 px-32 py-8'>
      <UserProfileCard children={user} />
      <div className='w-2/3 flex flex-col gap-8'>
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <PostCard key={index} post={post} avatar={user.avatar} />
          ))
        ) : (
          <p>No posts are available!</p>
        )}
      </div>
      <UserProfileCard children={user} />
    </div>
  );
};

export default HomePage;
