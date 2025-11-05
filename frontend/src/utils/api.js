// small helper to get backend base url and token helpers
export const BACKEND = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

export function saveToken(token) {
  if (typeof window !== 'undefined') localStorage.setItem('nn_token', token);
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('nn_token');
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function clearToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('nn_token');
}

export function logout() {
  // For stateless JWT, logging out is just clearing the token on the client
  clearToken();
}
