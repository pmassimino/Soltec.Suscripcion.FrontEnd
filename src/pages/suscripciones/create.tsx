import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Plan, Sujeto, Suscripcion, } from '../../models/model';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import SuscripcionForm from '../../componets/suscripciones/forms';
import BackEndError, { ErrorItem } from '@/utils/errors';



const SuscripcionCreate = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [planes, setPlanes] = useState<Plan[]>();
  const [sujetos, setSujetos] = useState<Sujeto[]>();  
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    const fetchPlanes = async () => {
      try {
        const entity = await apiService.get<Plan[]>(`/plan`);
        setPlanes(entity);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };
    const fetchSujetos = async () => {
      try {
        const entity = await apiService.get<Sujeto[]>(`/sujeto`);
        const entityOrdenados = entity.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setSujetos(entityOrdenados);        
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };   
    fetchPlanes();
    fetchSujetos();
  },[]);
  const handleSubmit = async (entity: Suscripcion) => {
    entity.idPlan= Number(entity.idPlan);
    entity.importe = Number(entity.importe);
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    let newEntity: Suscripcion;
    try {
      newEntity = await apiService.post<Suscripcion>("/suscripcion", entity);
      router.push(`/suscripciones/`);
    } catch (error ) {
      if (error instanceof BackEndError)            
         setErrorList(error.errors);          
    }
    setIsSubmitting(false);
  };
  const initialValue =  {
    id: 0,    
    idCuenta: '',
    idPlan: 0,    
    importe: 0,
    estado: 'ACTIVO',
  };

  return (
    <>
    <Layout title='Crear Nuevo '>
      <h1>Crear nueva suscripcion</h1>
      <SuscripcionForm onSubmit={handleSubmit} planes={planes}  entity={initialValue} sujetos={sujetos} isSubmitting={isSubmitting} errorList={errorList} />      
      </Layout>
    </>
  );
};

export default withAuth(SuscripcionCreate);
