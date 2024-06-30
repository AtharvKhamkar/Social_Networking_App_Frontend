import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { loginUser } from '../features/userRequest';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setError('');
    try {
      await dispatch(loginUser(data));
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#eeeeee] py-8'>
      <div className='w-1/2 bg-[#ffffff] flex flex-col justify-center  rounded-lg mx-auto p-4'>
        <p className='text-start text-md font-bold'>
          Welcome to Sociopedia. the Social Media For Sociopaths
        </p>
        {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className='space-y-5'>
            <Input
              label='Username'
              placeholder='Enter your username'
              type='text'
              {...register('userName', {
                required: true,
              })}
            />
            <Input
              label='Email'
              placeholder='Enter your email'
              type='email'
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label='Password'
              placeholder='Enter your password'
              type='password'
              {...register('password', {
                required: true,
              })}
            />
            <Button children='Login' type='submit' />
          </div>
        </form>
        <span className='text-[#03d0fa] text-sm py-2 cursor-pointer hover:underline'>
          Don't have account? Create account
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
