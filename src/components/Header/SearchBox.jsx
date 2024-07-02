import React, { useState } from 'react';
import searchIcon from '../../assets/search.png';
const SearchBox = React.forwardRef(function SearchBox(
  { placeholder, icon, iconStatus=false, type = 'text', className = '', ...props },
  ref
) {
  {
    const [query, setQuery] = useState('');
    return (
      <div
        className={`flex item-center bg-[#eeeeee] py-2 px-8 rounded-lg mx-8 text-sm ${className}`}
      >
        <input
          type={type}
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className={`text-gray-500 ml-2 bg-transparent flex-grow outline-none`}
          ref={ref}
          {...props}
        />
        <img
          hidden= {iconStatus}
          src={searchIcon}
          alt='search-icon'
          className='w-5 h-5'
        />
      </div>
    );
  }
});

export default SearchBox;
