import React from 'react';
import commentIcon from '../assets/comment.png';
import likeIcon from '../assets/like.png';
import sendRequestIcon from '../assets/send_request.png';
import shareIcon from '../assets/share.png';

const PostCard = ({ post, avatar }) => {
  return (
    <div className='w-full bg-white rounded-lg p-4 text-gray-400'>
      <div className='flex justify-between items-center my-2'>
        <div className='flex gap-4'>
          <img
            src={avatar}
            alt='profile-image'
            className='rounded-full w-12 h-12 object-cover'
          />
          <div>
            <p className='text-gray-500 font-semibold'>{post.owner}</p>
            <p className='text-sm'>New York, CA</p>
          </div>
        </div>
        <div className='flex items-center justify-center rounded-full bg-[#e1f9fc] w-10 h-10'>
          <img src={sendRequestIcon} alt='send-request' className='w-5 h-5' />
        </div>
      </div>
      <p className='text-gray-500'>{post.description}</p>
      <div>
        <img
          src={post.content}
          className='rounded-lg w-full h-auto object-cover'
        />
      </div>
      <div className='flex justify-between'>
        <div className='flex my-4 items-center gap-2 text-gray-500'>
          <img src={likeIcon} alt='like-icon' className='w-4 h-4' />
          <span className='text-sm mr-4'>{ post.like_count}</span>
          <img src={commentIcon} alt='comment-icon' className='w-5 h-5' />
          <span className='text-sm'>4</span>
        </div>
        <div className='my-4'>
          <img src={shareIcon} alt='share-icon' className='w-4 h-4' />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
