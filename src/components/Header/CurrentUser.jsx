import React from 'react';

const CurrentUser = ({ children }) => {
  return (
    <div className='flex bg-[#eeeeee] rounded-lg text-sm px-4 ml-8  items-center '>
      <p className='text-gray-500 font-semibold'>{children}</p>
    </div>
  );
};

export default CurrentUser;
