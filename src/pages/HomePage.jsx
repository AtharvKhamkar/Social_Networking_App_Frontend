import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = auth.user;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getUserFeed({ page: 1, limit: 5, token: auth.token }));
      await dispatch(userprofile({ token: auth.token }));
      setLoading(false);
    };

    if (auth.token) {
      fetchData();
    }
  }, [dispatch, auth.token]);

  const userPostsInfo = useSelector(selectUserPosts);
  const userProfile = useSelector(selectUserProfile);
  console.log(userProfile);
  const userPosts = userPostsInfo.docs;

  if (loading) {
    return <div>Loading...</div>;
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
        <UploadPost token={auth.token} />
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <PostCard key={index} post={post} avatar={user.user.avatar} />
          ))
        ) : (
          <p>No posts are available!</p>
        )}
      </div>
      <div className='w-1/3 space-y-5'>
        <SuggestedFriendCard token={auth.token} />
      </div>
    </div>
  );
};

export default HomePage;
