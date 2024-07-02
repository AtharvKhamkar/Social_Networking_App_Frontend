import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sendRequestIcon from '../assets/send_request.png';
import { selectSuggestedUsers } from '../features/Suggest/suggestSlice';
import { suggestFriends } from '../features/userRequest';

const SuggestedFriendCard = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      await dispatch(suggestFriends({ token }));
    };

    if (token) {
      fetchSuggestedUsers();
    }
  }, [dispatch, token]);

  const suggestedUser = useSelector(selectSuggestedUsers);

  return (
    <div className='w-full space-y-2 p-4 bg-white rounded-lg'>
      <p className='text-gray-500 text-md font-semibold'>Suggested Friends</p>
      <hr className='border-gray-300 border-t-2' />
      <div className='flex flex-col p-1 justify-between'>
        {suggestedUser && suggestedUser.length > 0 ? (
          suggestedUser.map((user) => (
            <div className='flex justify-between'>
              <div className='flex'>
                <img
                  src={user.avatar}
                  alt='friend-avatar'
                  className='w-12 h-12 rounded-full object-cover'
                />
                <div className='m-2'>
                  <p className='font-semibold'>{user.userName}</p>
                  <p className='text-gray-400 text-sm'>0 followers</p>
                </div>
              </div>
              <div className='flex items-center justify-center rounded-full bg-[#e1f9fc] w-10 h-10'>
                <img
                  src={sendRequestIcon}
                  alt='send-request'
                  className='w-5 h-5'
                />
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedFriendCard;
