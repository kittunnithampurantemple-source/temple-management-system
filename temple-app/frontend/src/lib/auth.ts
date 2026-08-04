import { api } from './api';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export function saveTokens(tokens: AuthTokens) {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isLoggedIn() {
  return typeof window !== 'undefined' && !!localStorage.getItem('accessToken');
}

export async function login(email: string, password: string) {
  const tokens = await api.post('/auth/login', { email, password });
  saveTokens(tokens);
  return tokens;
}

export async function logout() {
  try { await api.post('/auth/logout'); } catch {}
  clearTokens();
}
