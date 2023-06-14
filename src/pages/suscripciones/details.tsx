import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "@/services/apiService";
import { Suscripcion } from '@/models/model';
import SuscripcionForm from '../../componets/suscripciones/forms';
import Layout from '@/componets/Layout';

type Props = {
  id: string;
};

const SuscripcionDetails = ({ id }: Props) => {
  const router = useRouter();
  const [entity, setEntity] = useState<Suscripcion | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
 

  const handleDelete = async () => {
    const apiUrl = process.env.API_URL ?? '';

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta suscripcion?');
    if (!confirmDelete) {
      return;
    }

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.delete(`/suscripcion/${id}`,null);
      router.push('/suscripciones');
    } catch (error) {     
      if (error instanceof Error) {  
        const jsonObject = JSON.parse(error.message);
        const errorValue = Object.values(jsonObject)[0];         
        setErrorMessage(errorValue as string);
      }
      
      console.error(error);
    }
  };
  const handleEdit = async () => {
    router.push(`/suscripciones/${id}`);
  };

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';

    const apiService = new ApiService(apiUrl);
    apiService.get<Suscripcion>(`/suscripcion/${id}`).then((fetchedPlan) => {
      setEntity(fetchedPlan);
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  if (!entity) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title={`Detalle Suscripcion #${entity.id}`}>
        {errorMessage && <p>{errorMessage}</p>}
        <h1>Id :{entity.id}</h1>
        <p>Nombre: {entity.idCuenta}</p>      
        <button onClick={handleDelete}>Eliminar</button>
        <button onClick={handleEdit}>Editar</button>        
      </Layout>
    </>
  );
};

export default SuscripcionDetails;
