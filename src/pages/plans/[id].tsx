
import { useRouter } from 'next/router';
import PlanEdit from './edit';
import { withAuth } from '@/componets/withAuth/withAuth';

const PlanEditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <PlanEdit id={id} />;
};

export default withAuth(PlanEditPage);
