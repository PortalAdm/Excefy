import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const api: AxiosInstance = axios.create({
  baseURL
});
