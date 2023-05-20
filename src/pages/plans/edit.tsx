import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Plan } from '../../models/model';
import PlanForm from './forms';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import BackEndError, { ErrorItem } from '@/utils/errors';

interface EditProps {
  id: string;
}

const PlanEdit = ({ id }: EditProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState<Plan>();
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);

    const fetchEntity = async () => {
      try {
        const plan = await apiService.get<Plan>(`/plan/${id}`);
        setInitialValues(plan);
      } catch (error) {
        if (error instanceof BackEndError)            
      setErrorList(error.errors);  
      }
    };
    fetchEntity();
  }, [id]);

  const handleSubmit = async (plan: Plan) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.put<Plan>(`/plan/${id}`, plan);
      router.push(`/plans/`);
    } catch (error) {
      // Manejo del error
      console.error(error);
    }
    setIsSubmitting(false);
  };

  if (!initialValues) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title='Editar plan'>
        <h1>Editar plan</h1>
        <PlanForm entity={initialValues} onSubmit={handleSubmit} isSubmitting={isSubmitting} errorList={errorList} />
      </Layout>
    </>
  );
};

export default PlanEdit;
