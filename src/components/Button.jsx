import React from 'react';

const Button = ({
  children,
  type = 'button',
  bgColor = 'bg-[#03d0fa]',
  textColor = 'text-white',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`w-full rounded-lg ${bgColor} ${textColor} text-sm font-semibold p-3 uppercase`}
    >
      {children}
    </button>
  );
};

export default Button;
