// Authentication utility functions
export const isLoggedIn = (): boolean => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = (): void => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
};

export const requireAuth = (redirectTo: string = '/login') => {
  if (!isLoggedIn()) {
    window.location.href = `${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`;
    return false;
  }
  return true;
};