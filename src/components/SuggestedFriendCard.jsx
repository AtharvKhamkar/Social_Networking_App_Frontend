import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className='flex flex-col p-1 justify-between gap-4'>
        {suggestedUser && suggestedUser.length > 0 ? (
          suggestedUser.map((user) => (
            <Link to={`/${user.userName}`}>
              <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                  <img
                    src={user.avatar}
                    alt='friend-avatar'
                    className='w-12 h-12 rounded-full object-cover'
                  />
                  <p className='font-semibold'>{user.userName}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedFriendCard;
