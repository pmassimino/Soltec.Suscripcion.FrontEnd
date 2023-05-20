export class Plan {
    id: number | undefined;
    nombre: string | undefined;      
}

export interface Sujeto {
    id: string
    nombre: string
    numeroDocumento: string
    numeroIngBruto: string
    domicilio: string
    localidad: string
    idProvincia: any
    provincia: string
    idCategoria: any
    categoria: any
    codigoPostal: string
    condicionIva: string
    condicionIB: string
    subdiarios: Subdiario[]
  }
  
  export interface Subdiario {
    id: string
    nombre: string
    idDivisa: number
  }
  export interface Suscripcion {
    id: number
    idCuenta: string    
    idPlan: number    
    estado: string
    importe: number
  }
  export interface SuscripcionView {
    id: number
    idCuenta: string
    cuenta:string
    idPlan: number
    plan:string
    estado: string
    importe: number
  }
  
  
  