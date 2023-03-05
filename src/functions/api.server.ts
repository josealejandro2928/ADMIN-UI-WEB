import { FormLoginData } from '../routes/Login';
import { SignupFormData } from '../routes/Signup';

const API_URL = import.meta.env.VITE_API_URL;

async function handleFetchResponse<T>(res: any) {
  let bodyRes = await res.json();
  if (res.status < 200 || res.status > 399) throw bodyRes;
  return bodyRes;
}

export async function login<T>(data: FormLoginData): Promise<T> {
  let res = await fetch(API_URL + '/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return handleFetchResponse<T>(res);
}

export async function signUp<T>(data: SignupFormData): Promise<T> {
  let res = await fetch(API_URL + '/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return handleFetchResponse<T>(res);
}

export async function getModels<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/models', {
    headers: {
      Authorization: `${token}`,
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function uploadModels<T>(data: FormData, token: string): Promise<T> {
  let res = await fetch(API_URL + '/models', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    body: data,
  });
  return handleFetchResponse<T>(res);
}

export async function deleteModel<T>(modelPath: string, token: string): Promise<T> {
  let res = await fetch(API_URL + '/models', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ path: modelPath }),
  });
  return handleFetchResponse<T>(res);
}
