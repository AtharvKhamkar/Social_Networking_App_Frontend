import React from 'react';

const ShimmerProfileDetail = () => {
  return (
    <div className='animate-pulse w-full space-y-8'>
      <div className='flex space-x-4'>
        <div className='rounded-full w-48 h-48 bg-[#eeeeee]'></div>
        <div className='flex flex-col flex-grow space-y-4'>
          <div className='w-full h-16 bg-[#eeeeee] rounded-lg'></div>
          <div className='flex flex-grow space-x-4'>
            <div className='w-full h-12 bg-[#eeeeee] rounded-2xl'></div>
            <div className='w-full h-12 bg-[#eeeeee] rounded-2xl'></div>
            <div className='w-full h-12 bg-[#eeeeee] rounded-2xl'></div>
          </div>
          <div className='flex flex-grow justify-between'>
            <div className='w-24 h-12 bg-[#eeeeee] rounded-2xl'></div>
            <div className='w-48 h-12 bg-[#eeeeee] rounded-2xl'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerProfileDetail;
