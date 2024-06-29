import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { loginUser, logoutUser } from './features/userRequest';
import { selectAuth } from './features/userSlice';

function Test() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const token = auth.token;

  const BASE_URL =
    'https://social-networking-app.onrender.com/api/v1/users/login';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      userName,
      email,
      password,
    };

    dispatch(loginUser(requestData));
  };

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logoutUser({ token }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <label htmlFor='userName'>Username</label>
          <input
            type='text'
            placeholder='Enter your username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='flex'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <div>{auth && <p> Response: {JSON.stringify(auth)}</p>}</div>
      <div>{error && <p>Error: {JSON.stringify(error?.message)}</p>}</div>
    </div>
  );
}

export default Test;
