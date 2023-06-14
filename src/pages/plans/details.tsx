import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "@/services/apiService";
import { Plan } from '@/models/model';
import PlanForm from '../../componets/plans/forms';
import Layout from '@/componets/Layout';
import BackEndError, { ErrorItem } from '@/utils/errors';
import ErrorList from '@/componets/errorList';

type Props = {
  id: string;
};

const PlanDetails = ({ id }: Props) => {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
 

  const handleDelete = async () => {
    const apiUrl = process.env.API_URL ?? '';

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este plan?');
    if (!confirmDelete) {
      return;
    }

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.delete(`/plan/${id}`,null);
      router.push('/plans');
    } catch (error) {     
      if (error instanceof BackEndError)            
      setErrorList(error.errors);  
      
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
        <h1>Plan :{plan.id}</h1>
        <p>Nombre: {plan.nombre}</p>      
        <button onClick={handleDelete}>Eliminar plan</button>
        <button onClick={handleEdit}>Editar plan</button> 
        <ErrorList errorList={errorList}></ErrorList>      
      </Layout>
    </>
  );
};

export default PlanDetails;
