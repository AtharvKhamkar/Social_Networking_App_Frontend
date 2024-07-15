import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkLoggedIn } from '../features/userSlice';

const AuthLayout = ({ children, authentication = 'true' }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const token = useSelector(checkLoggedIn);

  let authStatus = false;
  if (token) {
    authStatus = true;
  }

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login');
    } else {
      navigate('/');
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
