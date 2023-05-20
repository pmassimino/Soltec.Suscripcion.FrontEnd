import { useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Plan } from '../../models/model';
import PlanForm from './forms';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';

const PlanCreate = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (plan: Plan) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    let newPlan: Plan;
    try {
      newPlan = await apiService.post<Plan>("/plan", plan);
      router.push(`/plans/${newPlan.id}/details`);
    } catch (error) {
      // Manejo del error
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
    <Layout title='Crear Nuevo Plan'>
      <h1>Crear nuevo plan</h1>
      <PlanForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Layout>
    </>
  );
};

export default withAuth(PlanCreate);
