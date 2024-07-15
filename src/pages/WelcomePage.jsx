import React from 'react';
import { Link } from 'react-router-dom';
import { welcomeIcon } from '../assets';
import Button from '../components/Button';

const WelcomePage = () => {
  return (
    <div className='bg-[#eeeeee] w-full min-h-screen py-[10%]'>
      <div className='flex flex-col justify-center w-3/4 h-2/3 bg-[#ffffff] mx-auto rounded-lg px-4 py-[5%]'>
        <div className='flex justify-between p-1'>
          <p className='font-bold text-7xl'>
            Welcome to <span className='text-[#12cdf2]'>Sociopedia</span>
            <p className='text-2xl py-2 text-gray-600'>
              Connect, Share, Inspire
            </p>
            <Link to='/signup'>
              <Button children='Get Started Now' />
            </Link>
            <Link to='/login'>
              <Button children='Login' />
            </Link>
          </p>
          <img src={welcomeIcon} alt='welcome-svg' className='w-[60%]' />
        </div>
        <div className='flex'></div>
      </div>
    </div>
  );
};

export default WelcomePage;
