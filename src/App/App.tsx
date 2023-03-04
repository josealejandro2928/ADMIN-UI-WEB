import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import './App.scss'
import AdminLayout from '../layout/AdminLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Switch } from '@mantine/core';
import Login from '../routes/Login';
import Repository from '../components/Repository/Repository';
import Home from '../components/Home/Home';
import Signup from '../routes/Signup';
import AuthLayout from '../layout/AuthLayout';
import { ErrorBoundary } from '../common/ErrorBoundary';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
function App() {

  return (

    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Repository />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000}
        position="bottom-right"
        closeButton={true}
        transition={Slide}
        pauseOnHover limit={3} />
    </ErrorBoundary>
  )
}

export default App
