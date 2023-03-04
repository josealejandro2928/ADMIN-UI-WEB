import { useState } from 'react';
import { handleAndVisualizeError } from '../common';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserLogout } from '../store/features/userSlice';

const useAuthMidd = <T>(fn: (...params: any[]) => T | Promise<T>) => {
  const { token } = useAppSelector((state) => state.users);
  const [tokenExpired, setTokenExpired] = useState<boolean>(false);
  const dispatch = useAppDispatch()

  const newFunction = async (...args: any[]) => {
    try {
      let res: T = await fn(...args, token);
      return res;
    } catch (e: any) {
      let code = e.code || e.statusCode || 200;
      if (code == 401) {
        handleAndVisualizeError('Invalid token or token expired', e);
        setTokenExpired(true);
        dispatch(setUserLogout());
      }
      throw e;
    }
  };
  return { newFunction, tokenExpired, setTokenExpired };
};

export default useAuthMidd;
