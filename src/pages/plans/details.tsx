import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "@/services/apiService";
import { Plan } from '@/models/model';
import PlanForm from './forms';
import Layout from '@/componets/Layout';

type Props = {
  id: string;
};

const PlanDetails = ({ id }: Props) => {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
 

  const handleDelete = async () => {
    const apiUrl = process.env.API_URL ?? '';

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este plan?');
    if (!confirmDelete) {
      return;
    }

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.delete(`/plan/${id}`);
      router.push('/plans');
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
    router.push(`/plans/${id}`);
  };

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';

    const apiService = new ApiService(apiUrl);
    apiService.get<Plan>(`/plan/${id}`).then((fetchedPlan) => {
      setPlan(fetchedPlan);
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  if (!plan) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title={`Detalle Plan #${plan.id}`}>
        {errorMessage && <p>{errorMessage}</p>}
        <h1>Plan :{plan.id}</h1>
        <p>Nombre: {plan.nombre}</p>      
        <button onClick={handleDelete}>Eliminar plan</button>
        <button onClick={handleEdit}>Editar plan</button>        
      </Layout>
    </>
  );
};

export default PlanDetails;
