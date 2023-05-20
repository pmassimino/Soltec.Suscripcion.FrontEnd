import { NextApiRequest, NextApiResponse } from "next";
import {getToken} from '../services/auth'
import BackEndError, { ErrorItem } from "@/utils/errors";

interface ApiError {
  message: string;
  errors: { [key: string]: string };
}
class ApiService {
  constructor(private url: string) {}

  private async makeRequest<T>(path: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const token = getToken();
    if (typeof window !== "undefined" && token ) {
      headers.Authorization = `Bearer ${token }`;
    }
    const response = await fetch(`${this.url}${path}`, {
      headers,
      ...options,
    });   
    if (response.status === 400 ) {
      //const errorData: ApiError = await response.json();
      //throw new Error(JSON.stringify(errorData));
      const errorData = await response.json();
        const errorList: ErrorItem[] = Object.entries(errorData)
          .flatMap(([key, value]) => {
            if (typeof value === 'string') {
              return { key, message: value } as ErrorItem;
            }
            return [];
          });
          throw new BackEndError('Error de Backend', errorList);
    }
    const data = await response.json();
    if (response.ok) {      
      return data as T;
    } else {
      throw new Error(data?.error || "Something went wrong.");
    }
  }

  async get<T>(path: string) {
    return this.makeRequest<T>(path);
  }

  async post<T>(path: string, body: any) {
    return this.makeRequest<T>(path, { method: "POST", body: JSON.stringify(body) });
  }

  async put<T>(path: string, body: any) {
    return this.makeRequest<T>(path, { method: "PUT", body: JSON.stringify(body) });
  }

  async delete<T>(path: string) {
    return this.makeRequest<T>(path, { method: "DELETE" });
  }  
}

export default ApiService;
