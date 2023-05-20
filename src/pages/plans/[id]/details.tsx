import { useRouter } from 'next/router';
import PlanDetails from '../details';
import { withAuth } from '@/componets/withAuth/withAuth';

const PlanDetailsPage = () => {
  const router = useRouter();
  const id = router.query.id?.[0];

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <PlanDetails id={id} />;
};

export default withAuth(PlanDetailsPage);
