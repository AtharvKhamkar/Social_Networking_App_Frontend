import React, { useState } from 'react';

const InputCommentBox = (
  { label, placeholder, type = 'text', className = '', ...props },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className='w-full bg-[#ffffff]'>
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className='flex items-center gap-1 my-1'
      ></input>
      <hr />
    </div>
  );
};

export default React.forwardRef(InputCommentBox);
