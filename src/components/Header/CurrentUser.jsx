import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dropDown } from '../../assets';
import { logoutUser } from '../../features/userRequest';
import { selectAuth } from '../../features/userSlice';

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user?.user?.userName);
  const auth = useSelector(selectAuth);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const seeProfile = () => {
    setIsOpen(!isOpen);
    navigate(`/${user}`);
  };

  const logoutHandler = () => {
    dispatch(logoutUser({ token: auth?.token }));
    setIsOpen(!isOpen);
    navigate('/login');
  };

  return (
    <div className='flex items-center bg-[#eeeeee] rounded-lg text-sm px-4 ml-8 h-8'>
      <div className='flex items-center justify-between'>
        <p className='text-gray-500 font-semibold'>
          {user ? user : 'Test User'}
        </p>
        <img
          src={dropDown}
          alt='dropDown-icon'
          onClick={toggleDropDown}
          className='h-5 w-5 cursor-pointer'
        />
      </div>
      {isOpen && (
        <div className='absolute right-32 top-11 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
          <div className='py-1'>
            <button
              onClick={seeProfile}
              className='block px-4 py-2 text-md font-semibold text-gray-500 hover:bg-gray-100 w-full text-left'
            >
              Profile
            </button>
            <button
              onClick={logoutHandler}
              className='block px-4 py-2 text-md font-semibold text-gray-500 hover:bg-gray-100 w-full text-left'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentUser;
