import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Plan, Sujeto, Suscripcion } from '../../models/model';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import SuscripcionForm from './forms';

interface EditProps {
  id: string;
}

const SuscripcionEdit = ({ id }: EditProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entity, setEntity] = useState<Suscripcion>();
  const [planes, setPlanes] = useState<Plan[]>();
  const [sujetos, setSujetos] = useState<Sujeto[]>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      if (error instanceof Error) {  
        const jsonObject = JSON.parse(error.message);
        const errorValue = Object.values(jsonObject)[0];         
        setErrorMessage(errorValue as string);
      }
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
        <SuscripcionForm entity={entity} planes={planes} sujetos={sujetos} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        {errorMessage && <p>{errorMessage}</p>}
      </Layout>
    </>
  );
};

export default SuscripcionEdit;
