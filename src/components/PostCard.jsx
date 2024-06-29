import React from 'react';
import commentIcon from '../assets/comment.png';
import likeIcon from '../assets/like.png';
import sendRequestIcon from '../assets/send_request.png';
import shareIcon from '../assets/share.png';
import Button from './Button';

const PostCard = () => {
  return (
    <div className='w-full bg-white rounded-lg p-4 text-gray-400'>
      <div className='flex justify-between items-center my-2'>
        <div className='flex gap-4'>
          <img
            src='https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg'
            alt='profile-image'
            className='rounded-full w-12 h-12 object-cover'
          />
          <div>
            <p className='text-gray-500 font-semibold'>Apple IceCream</p>
            <p className='text-sm'>New York, CA</p>
          </div>
        </div>
        <div className='flex items-center justify-center rounded-full bg-[#e1f9fc] w-10 h-10'>
          <img src={sendRequestIcon} alt='send-request' className='w-5 h-5' />
        </div>
      </div>
      <p className='text-gray-500'>Some really long description</p>
      <div>
        <img
          src='https://images.pexels.com/photos/24244035/pexels-photo-24244035/free-photo-of-elephant-by-river.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
          alt='post-image'
          className='rounded-lg w-full h-auto object-cover'
        />
      </div>
      <div className='flex justify-between'>
        <div className='flex my-4 items-center gap-2 text-gray-500'>
          <img src={likeIcon} alt='like-icon' className='w-4 h-4' />
          <span className='text-sm mr-4'>6</span>
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
