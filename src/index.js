import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexPage from './pages';
import ParticipantPage from './pages/participant';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: 'participant/:cardId',
    element: <ParticipantPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
