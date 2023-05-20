import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Plan, Sujeto, Suscripcion } from '../../models/model';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import SuscripcionForm from './forms';
import BackEndError, { ErrorItem } from '@/utils/errors';

interface EditProps {
  id: string;
}

const SuscripcionEdit = ({ id }: EditProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entity, setEntity] = useState<Suscripcion>();
  const [planes, setPlanes] = useState<Plan[]>();
  const [sujetos, setSujetos] = useState<Sujeto[]>();
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);

    const fetchEntity = async () => {
      try {
        const entity = await apiService.get<Suscripcion>(`/suscripcion/${id}`);
        setEntity(entity);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };
    const fetchPlanes = async () => {
      try {
        const planes = await apiService.get<Plan[]>(`/plan`);
        setPlanes(planes);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };
    const fetchSujetos = async () => {
      try {
        const entity = await apiService.get<Sujeto[]>(`/sujeto`);
        setSujetos(entity);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };
    fetchEntity();
    fetchPlanes();
    fetchSujetos();
  }, [id]);

  const handleSubmit = async (entity: Suscripcion) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.put<Suscripcion>(`/suscripcion/${id}`, entity);
      router.push(`/suscripciones/`);
    } catch (error) {
      if (error instanceof BackEndError)            
         setErrorList(error.errors);    
    }
    setIsSubmitting(false);
  };

  if (!entity) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title='Editar Suscripcion'>
        <h1>Editar</h1>
        <SuscripcionForm entity={entity} planes={planes} sujetos={sujetos} onSubmit={handleSubmit} isSubmitting={isSubmitting} errorList={errorList} />        
      </Layout>
    </>
  );
};

export default SuscripcionEdit;
