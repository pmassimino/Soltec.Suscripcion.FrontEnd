import jwt, { JwtPayload } from 'jsonwebtoken';
import  decodeToken  from 'jwt-decode';
export async function login(nombre: string, password: string) {
    //const apiUrl = process.env.API_URL!;
    const apiUrl = process.env.API_URL;

    const response = await fetch(apiUrl + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, password })
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    return data.token;
  }
  
  export function getToken() {
    return localStorage.getItem('accessToken');
  }
  
  export function setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  
  export function clearToken() {
    localStorage.removeItem('accessToken');
  }
  
  export function isTokenExpired(token: string): boolean {
    // Decodifica el token para obtener la información del payload.
    const payload = jwt.decode(token) as { exp?: number };
  
    // Si no se encuentra la propiedad 'exp' en el payload, se asume que el token no tiene fecha de expiración.
    if (!payload.exp) {
      return false;
    }
  
    // Compara la fecha de expiración con la fecha actual.
    const expirationDate = new Date(payload.exp * 1000); // Multiplica por 1000 para convertir a milisegundos.
    const currentDate = new Date();
    return expirationDate <= currentDate;
  }
  

export function isAdmin() {
  const token = getToken(); // Obtén el token desde tu lógica de autenticación

  if (token) {
    const decodedToken = decodeToken(token) as { role: string[] }; // Assuming the decoded token has a "role" field of type string[]
    const roles = decodedToken.role as string[] ; // Suponiendo que los roles se encuentren en el campo "roles" del token

    if (roles) {
      const rolesArray = Array.isArray(roles) ? roles : [roles];
      if (rolesArray.map(role => role.toLowerCase()).includes('admin')) {
        return true;
      }
    }
  }

  return false;
}
