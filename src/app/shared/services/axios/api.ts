import axios, { AxiosInstance } from 'axios';
import { getSystemToken } from '../../utils/constants/getSystemToken';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const sysToken = getSystemToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${sysToken}`
};

export const api: AxiosInstance = axios.create({
  baseURL,
  headers
});
