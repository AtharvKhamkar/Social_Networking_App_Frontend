import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { signupUser } from '../features/userRequest';

const SignupPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDropAvatar = (acceptedFiles) => {
    setValue('avatar', acceptedFiles[0]);
  };

  const onDropCoverImage = (acceptedFiles) => {
    setValue('coverImage', acceptedFiles[0]);
  };

  const {
    getRootProps: getRootPropsAvatar,
    getInputProps: getInputPropsAvatar,
  } = useDropzone({ onDrop: onDropAvatar });
  const {
    getRootProps: getRootPropsCoverImage,
    getInputProps: getInputPropsCoverImage,
  } = useDropzone({ onDrop: onDropCoverImage });

  const Signup = async (data) => {
    setError('');
    try {
      await dispatch(signupUser(data));
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#eeeeee] py-8'>
      <div className='w-1/2 bg-[#ffffff] flex flex-col justify-center rounded-lg mx-auto p-4'>
        <p className='text-start text-md font-bold'>
          Welcome to Sociopedia. the Social Media For Sociopaths
        </p>
        {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(Signup)}>
          <div className='space-y-5'>
            <Input
              label='Name'
              placeholder='Enter your name'
              type='text'
              {...register('name', {
                required: true,
              })}
            />
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
            <Input
              label='Bio'
              placeholder='Enter your bio'
              type='text'
              {...register('bio')}
            />
            <div {...getRootPropsAvatar()}>
              <input {...getInputPropsAvatar()} />
              <p>Drag and drop avatar image here or click to select file</p>
            </div>
            <div {...getRootPropsCoverImage()}>
              <input {...getInputPropsCoverImage()} />
              <p>Drag and drop cover image here or click to select file</p>
            </div>
            <Button children='Signup' type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
