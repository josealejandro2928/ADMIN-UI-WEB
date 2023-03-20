import { useEffect } from 'react'
import './App.scss'
import AdminLayout from '../layout/AdminLayout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
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
import Config from '../components/Config/Config';
import { useLocalStorage } from '@mantine/hooks';

function App() {
  const dispatch = useAppDispatch()
  const { isAuthInProgress } = useAppSelector((state) => state.users);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    dispatch(setIsAuthInProgress(true));
    verifyUser();
  }, [])

  async function verifyUser() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && token) {
      dispatch(setUserLogin({ user, token }));
    }
    dispatch(setIsAuthInProgress(false));

  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme: colorScheme }} withGlobalStyles withNormalizeCSS>
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
                <Route path="config" element={<Config />} />
              </Route>
              <Route path='*' element={<Navigate to="admin" />}></Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer autoClose={3000}
            position="bottom-right"
            closeButton={true}
            transition={Slide}
            pauseOnHover limit={3} />
        </ErrorBoundary >
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
