import React from 'react';
import {
  chatIcon,
  darkModeIcon,
  helpIcon,
  notificationIcon,
} from '../../assets/index';
import CurrentUser from './CurrentUser';
import SearchBox from './SearchBox';

const Header = () => {
  const navItems = [
    {
      name: 'chat',
      icon: chatIcon,
      slug: '/chat',
    },
    {
      name: 'notification',
      icon: notificationIcon,
      slug: '/notification',
    },
    {
      name: 'help',
      icon: helpIcon,
      slug: '/help',
    },
  ];
  return (
    <header className='bg-[#ffffff] mb-8 py-4 px-32'>
      <div className='flex justify-between items-center'>
        <div className='flex'>
          <p className='text-4xl font-bold text-[#12cdf2]'>Sociopedia</p>
          <SearchBox placeholder='Search' />
        </div>
        <div className='flex'>
          <ul className='flex list-none'>
            <li>
              <button onClick={() => {}}>
                <img src={darkModeIcon} alt='dark-mode' className='w-6 h-6' />
              </button>
            </li>
            {navItems &&
              navItems.map((item) => (
                <li key={item.name} className='ml-8'>
                  <button onClick={() => {}}>
                    <img src={item.icon} alt={item.name} className='w-6 h-6' />
                  </button>
                </li>
              ))}
          </ul>
          <CurrentUser children='Apple IceCream' />
        </div>
      </div>
    </header>
  );
};

export default Header;
