import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.BASE_URL;

export const api: AxiosInstance = axios.create({
  baseURL
});
