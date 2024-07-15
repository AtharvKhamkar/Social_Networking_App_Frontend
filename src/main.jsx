import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './app/store.js';
import AuthLayout from './components/AuthLayout.jsx';
import './index.css';
import HomePage from './pages/HomePage.jsx';
import Layout from './pages/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={true}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/Test',
        element: <WelcomePage />,
      },
      {
        path: '/:userName',
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
