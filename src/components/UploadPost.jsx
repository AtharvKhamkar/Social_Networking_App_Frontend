import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { uploadPost } from '../features/postRequest';
import Button from './Button';
import Input from './Input';

const UploadPost = ({ token,userPic }) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const onDropPost = (acceptedFile) => {
    setValue('content', acceptedFile[0]);
    setSelectedFile(acceptedFile[0]);
  };

  const { getRootProps: getRootPropsPost, getInputProps: getInputPropsPost } =
    useDropzone({ onDrop: onDropPost });

  const uploadPosts = (data) => {
    console.log(data);
    setError(' ');
    try {
      dispatch(
        uploadPost({
          description: data.description,
          content: data.content,
          token: token,
        })
      );
      setSelectedFile(null);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className='w-full bg-white rounded-lg p-4 text-gray-400'>
      <form onSubmit={handleSubmit(uploadPosts)}>
        <div className='flex items-center my-2 px-2'>
          <div className='mr-4'>
            <img
              src={userPic}
              alt='profile-image'
              className='rounded-full w-16 h-16 object-cover'
            />
          </div>
          <Input
            className='h-16 border-none bg-[#eeeeee] focus:border-[#03d0fa] text-center'
            placeholder='Write whatever you want to say'
            type='text'
            {...register('description')}
          />
        </div>
        <div
          className='border h-16 m-2 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#03d0fa]'
          {...getRootPropsPost()}
        >
          <input {...getInputPropsPost()} />
          {selectedFile ? (
            <p>{selectedFile.name}</p>
          ) : (
            <p>Drag and drop post here or click to select file</p>
          )}
        </div>
        {selectedFile && (
          <div>
            <p>Selected file : {selectedFile.name}</p>
          </div>
        )}
        <div className='flex mx-2'>
          <Button children='Post' type='submit' />
        </div>
      </form>
    </div>
  );
};

export default UploadPost;
