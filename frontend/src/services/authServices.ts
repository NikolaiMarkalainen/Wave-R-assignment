import type { ApiResult, ICreateUserPayload, ILoginPayload } from '@/types/types';

// Use import.meta.env to access environment variables exposed by Vite.
// We default to the /api proxy path configured in vite.config.js.
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const createUserService = async (payload: ICreateUserPayload): Promise<ApiResult> => {
  const url = `${API_URL}/auth/register/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return await returnAuthObject(response);
};

export const loginUserService = async (payload: ILoginPayload): Promise<ApiResult> => {
  const url = `${API_URL}/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  return await returnAuthObject(response);
};

const returnAuthObject = async (response: Response): Promise<ApiResult> => {
  const rawText = await response.text();
  let msg: string;

  try {
    const data = JSON.parse(rawText);
    msg = data.message || data.error || rawText;
  } catch {
    msg = rawText;
  }
  return {
    status: response.status,
    ok: response.ok,
    message: msg,
  };
};

export const verifyToken = async () => {
  const url = `${API_URL}/auth/me`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  return response.ok;
};

export const logoutUser = async () => {
  const url = `${API_URL}/auth/logout`;

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  });
  return response.ok;
};
