import React from 'react';

const CommentBox = ({ userName, comment }) => {
  return (
    <div className='w-full bg-[#ffffff]'>
      <div className='flex items-center gap-1 my-1'>
        <span className='text-sm font-bold text-gray-600'>{userName}</span>
        <span className='text-sm'>{comment}</span>
      </div>
      <hr />
    </div>
  );
};

export default CommentBox;
