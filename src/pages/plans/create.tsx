import { useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Plan } from '../../models/model';
import PlanForm from './forms';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import BackEndError, { ErrorItem } from '@/utils/errors';

const PlanCreate = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  const handleSubmit = async (plan: Plan) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    let newPlan: Plan;
    try {
      newPlan = await apiService.post<Plan>("/plan", plan);
      router.push(`/plans/${newPlan.id}/details`);
    } catch (error) {
      if (error instanceof BackEndError)            
      setErrorList(error.errors);  
    }
    setIsSubmitting(false);
  };

  return (
    <>
    <Layout title='Crear Nuevo Plan'>
      <h1>Crear nuevo plan</h1>
      <PlanForm onSubmit={handleSubmit} isSubmitting={isSubmitting} errorList={errorList} />      
      </Layout>
    </>
  );
};

export default withAuth(PlanCreate);
