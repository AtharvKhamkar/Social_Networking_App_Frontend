import React from 'react';
import ProfileDetailCard from '../components/ProfileDetailCard';

const ProfilePage = () => {
  
  return (
    <div className='w-full min-h-screen flex justify-center bg-[#eeeeee] py-8'>
      <div className='w-2/5'>
        <ProfileDetailCard />
      </div>
    </div>
  );
};

export default ProfilePage;
