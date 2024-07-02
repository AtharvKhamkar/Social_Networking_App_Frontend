import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOtherUser } from '../features/otherUser/otherUserRequest';
import { selectOtherUser } from '../features/otherUser/otherUserSlice';
import { selectAuth } from '../features/userSlice';

const ProfileDetailCard = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const auth = useSelector(selectAuth);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await dispatch(fetchOtherUser({ token: auth.token, userName: userName }));
      setLoading(false);
    };

    if (auth.token) {
      fetchUser();
    }
  }, [dispatch, auth.token, userName]);

  const otherUser = useSelector(selectOtherUser);
  console.log(otherUser);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className='w-full bg-[#ffffff] rounded-lg p-8 text-gray-400'>
      <div className='flex justify-between'>
        <img
          src={otherUser?.user.avatar}
          alt='profile-photo'
          className='rounded-full w-48 h-48 object-cover'
        />
        <div className='space-y-8'>
          <p className='text-black font-bold text-5xl'>
            {otherUser?.user.userName}
          </p>
          <div className='flex justify-between text-xl font-semibold'>
          <span>{otherUser?.user.posts.length}Posts</span>
            <span>{otherUser?.followers} Followers</span>
            <span>{otherUser?.following} Following</span>
          </div>
          <div>
            <p className='text-xl'>{otherUser?.user.name}</p>
            <span className='text-lg'>{otherUser?.user.bio || 'Bio'}</span>
          </div>
        </div>
      </div>
      <hr className='my-8' />
      <div>
        <p className='text-3xl'>Posts</p>
      </div>
    </div>
  );
};

export default ProfileDetailCard;
