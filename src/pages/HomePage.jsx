import React from 'react';
import Test from '../Test';
import PostCard from '../components/PostCard';
import UserProfileCard from '../components/UserProfileCard';

const HomePage = () => {
  return (
    <div className='flex w-full min-h-screen bg-[#eeeeee] font-roboto gap-16 px-32 py-8'>
      <UserProfileCard />
      <div className='w-2/3 flex flex-col gap-8'>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <Test />
      </div>
      <UserProfileCard />
    </div>
  );
};

export default HomePage;
