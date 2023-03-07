import { useEffect} from 'react'
import './App.scss'
import AdminLayout from '../layout/AdminLayout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Group, Loader} from '@mantine/core';
import Login from '../routes/Login';
import Repository from '../components/Repository/Repository';
import Models from '../components/Models/Models';
import Signup from '../routes/Signup';
import AuthLayout from '../layout/AuthLayout';
import { ErrorBoundary } from '../common/ErrorBoundary';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
import { setIsAuthInProgress, setUserLogin } from '../store/features/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ConversionAnalysis from '../components/ConversionAnalysis/ConversionAnalysis';
import Reports from '../components/Reports/Reports';
import Jupyter from '../components/Jupyter/Jupyter';

function App() {
  const dispatch = useAppDispatch()
  const { isLoggedIn, isAuthInProgress } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(setIsAuthInProgress(true));
    verifyUser();
  }, [])

  async function verifyUser() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && token) {
      dispatch(setUserLogin({ user, token }));
      dispatch(setIsAuthInProgress(false));
    } else {
      dispatch(setIsAuthInProgress(false));
    }

  }

  return (

    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="repository" />}></Route>
            <Route path="repository" element={<Repository />} />
            <Route path="models" element={<Models />} />
            <Route path="analysis" element={<ConversionAnalysis />} />
            <Route path="results" element={<Reports />} />
            <Route path="jupyter" element={<Jupyter />} />
          </Route>
          <Route path='*' element={<Navigate to="admin" />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000}
        position="bottom-right"
        closeButton={true}
        transition={Slide}
        pauseOnHover limit={3} />
      {isAuthInProgress &&
        (<Group position="center">
          <Loader size="lg" variant="bars" />
        </Group>)
      }
    </ErrorBoundary >
  )
}

export default App
