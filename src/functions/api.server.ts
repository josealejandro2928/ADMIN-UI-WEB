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

export async function getConfig<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/config', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function updateConfig<T>(data: any, token: string): Promise<T> {
  let res = await fetch(API_URL + '/config', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  });
  return handleFetchResponse<T>(res);
}

export async function getLatestLogs<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/reports/conv_analysis_phase', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function getModelDiscover<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/models/discover', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function getModelAnalyse<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/models/analyse', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function invalidCache<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/home/invalid_cache', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function getReports<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/reports', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function startJupyter<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/home/startJupyter', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}

export async function stopJupyter<T>(token: string): Promise<T> {
  let res = await fetch(API_URL + '/home/stopJupyter', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  return handleFetchResponse<T>(res);
}
