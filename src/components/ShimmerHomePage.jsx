import React from 'react';

const ProfileCardShimmer = () => {
  return (
    <div className='animate-pulse flex flex-col space-y-4'>
      <div className='flex space-x-4'>
        <div className='rounded-full h-14 w-16 bg-gray-300'></div>
        <div className='rounded-xl w-full h-14 bg-gray-300'></div>
      </div>
      <div className='w-full h-72 bg-gray-300 rounded-lg'></div>
    </div>
  );
};

const UserFeedShimmer = () => {
  return (
    <div className='animate-pulse flex flex-col space-y-4 pb-16'>
      <div className='flex space-x-8'>
        <div className='rounded-full w-16 h-16 bg-gray-300'></div>
        <div className='w-full rounded-xl h-16 bg-gray-300'></div>
      </div>
      <div className='w-full rounded-xl h-16 bg-gray-300'></div>
      <div className='w-full h-96 bg-gray-300'></div>
    </div>
  );
};

const SuggestShimmer = () => {
  return (
    <div className='animate-pulse flex space-x-4'>
      <div className='rounded-full w-14 h-14 bg-gray-300'></div>
      <div className='rounded-xl w-full h-14 bg-gray-300'></div>
    </div>
  );
};

const ShimmerHomePage = () => {
  return (
    <div className='flex w-full min-h-screen bg-[#eeeeee] gap-16 px-32 py-8'>
      <div className='w-1/3 space-y-4'>
        {[...Array(1)].map((_, i) => (
          <ProfileCardShimmer key={i} />
        ))}
      </div>
      <div className='w-2/3 flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          {[...Array(2)].map((_, i) => (
            <UserFeedShimmer key={i} />
          ))}
        </div>
      </div>
      <div className='w-1/3 space-y-4'>
        {[...Array(5)].map((_, i) => (
          <SuggestShimmer key={i} />
        ))}
      </div>
    </div>
  );
};

export default ShimmerHomePage;
