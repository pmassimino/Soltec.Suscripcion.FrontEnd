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
      const errorsList: ErrorItem[] = errorData.map((item: [string, string]) => ({
        key: item[0],
        message: item[1]
      }));      
      throw new BackEndError('Error de Backend', errorsList);
    }
    let data: T | null;
    try {
        data = response.ok ? await response.json() : null;
    } catch (error) {
       data = null; // Asignar un valor predeterminado en caso de excepción
    }
    if (response.ok) {      
      return data as T;
    } else {
      throw new Error("Something went wrong.");
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

  async delete<T>(path: string,body: any) {
    return this.makeRequest<T>(path, { method: "DELETE" ,body:JSON.stringify(body)});
  }  
}

export default ApiService;
