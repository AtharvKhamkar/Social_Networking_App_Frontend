import React from 'react';
import { Link } from 'react-router-dom';
import BagIcon from '../assets/bag.png';
import editIcon from '../assets/edit.png';
import linkedInIcon from '../assets/linkedin.png';
import LocationIcon from '../assets/location.png';
import profileIcon from '../assets/profile_setting.png';
import twitterIcon from '../assets/twitter.png';

const UserProfileCard = ({ children }) => {
  console.log(children);

  return (
    <div className='w-full p-4 bg-white rounded-lg'>
      <Link to={`/${children.user.userName}`}>
        <div className='flex justify-between pb-4'>
          <div className='flex'>
            <img
              src={children.user.avatar}
              alt='profile-image'
              className='rounded-full w-16 h-16 object-cover'
            />
            <div className='m-2'>
              <p className='font-semibold'>{children.user.userName}</p>
              <p className='text-gray-400 text-sm'>
                {children?.user.bio || 'Bio'}
              </p>
            </div>
          </div>
          <div className='flex  items-center'>
            <img src={profileIcon} alt='profile-icon' className='w-7 h-7' />
          </div>
        </div>
      </Link>
      <hr className='border-gray-300 border-t-2' />
      <div className='flex p-1 my-2'>
        <img src={LocationIcon} alt='location-icon' className='w-6 h-6 mr-2' />
        <p className='text-gray-400 text-sm'>Somewhere Out There, CA</p>
      </div>
      <div className='flex p-1 my-2'>
        <img src={BagIcon} alt='Bag-icon' className='w-6 h-6 mr-2' />
        <p className='text-gray-400 text-sm'>Some Degenerate</p>
      </div>
      <hr className='border-gray-300 border-t-2' />
      <div className='flex justify-between py-4'>
        <p className='text-gray-400 text-sm'>Followers</p>
        <span className='text-gray-500 text-sm font-semibold'>
          {children.followers}
        </span>
      </div>
      <div className='flex justify-between pb-2'>
        <p className='text-gray-400 text-sm'>Following</p>
        <span className='text-gray-500 text-sm font-semibold'>
          {children.following}
        </span>
      </div>
      <hr className='border-gray-300 border-t-2' />
      <div className='py-4'>
        <span className='text-gray-500 text-md font-semibold'>
          Social Profiles
        </span>
        <div className='flex justify-between'>
          <div className='flex py-1'>
            <img
              src={twitterIcon}
              alt='twitter-icon'
              className='w-6 h-6 mr-4 items-center'
            />
            <div>
              <p className='text-gray-500 text-sm font-semibold'>Twitter</p>
              <p className='text-gray-400 text-sm'>Social Network</p>
            </div>
          </div>
          <div className='flex items-center'>
            <img src={editIcon} alt='edit-icon' className='w-6 h-6' />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex py-1'>
            <img
              src={linkedInIcon}
              alt='twitter-icon'
              className='w-6 h-6 mr-4 items-center'
            />
            <div>
              <p className='text-gray-500 text-sm font-semibold'>LinkedIn</p>
              <p className='text-gray-400 text-sm'>Network Platform</p>
            </div>
          </div>
          <div className='flex items-center'>
            <img src={editIcon} alt='edit-icon' className='w-6 h-6' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
