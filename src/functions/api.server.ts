import { FormLoginData } from '../routes/Login';

const API_URL = import.meta.env.VITE_API_URL;

export async function login<T>(data: FormLoginData): Promise<T> {
  let res = await fetch(API_URL + '/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  let bodyRes = await res.json();
  if (res.status < 200 || res.status > 399) throw bodyRes;
  return bodyRes;
}
