import axios, { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import {getToken} from "./auth"

const api: AxiosInstance = axios.create({
  baseURL: 'https://example.com/api',
});

export function apiMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {    
    const token =getToken() ;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    return handler(req, res);
  };
}

export default api;