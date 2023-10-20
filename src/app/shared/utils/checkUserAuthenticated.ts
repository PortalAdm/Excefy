'use client';

export const checkUserAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const userToken = localStorage.getItem('token');

    return !!userToken;
  }
};
