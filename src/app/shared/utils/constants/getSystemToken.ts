import { parseCookies } from 'nookies';
const cookies = parseCookies();

export const getSystemToken = () => {
  try {
    const token = cookies._A;

    return token;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Token de acesso expirado', error);
  }
};
