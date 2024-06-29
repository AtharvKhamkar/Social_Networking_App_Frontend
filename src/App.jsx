import React from 'react';
import Header from './components/Header/Header';
import PostCard from './components/PostCard';
import UserProfileCard from './components/UserProfileCard';

const App = () => {
  return (
    <div className='w-full min-h-screen bg-gray-200 font-roboto'>
      <Header />
      <div className='flex gap-2'>
        <UserProfileCard />
        <div className='w-full flex flex-col gap-2'>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default App;
