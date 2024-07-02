import React from 'react';
import { useSelector } from 'react-redux';

const CurrentUser = () => {
  const user = useSelector((state) => state.auth?.user?.user?.userName);
  return (
    <div className='flex bg-[#eeeeee] rounded-lg text-sm px-4 ml-8  items-center h-8'>
      <p className='text-gray-500 font-semibold'>{user ? user : 'Test User'}</p>
    </div>
  );
};

export default CurrentUser;
