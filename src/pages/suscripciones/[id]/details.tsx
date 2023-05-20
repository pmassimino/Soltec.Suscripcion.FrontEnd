import { useRouter } from 'next/router';
import SuscripcionDetails from '../details';
import { withAuth } from '@/componets/withAuth/withAuth';

const SuscripcionDetailsPage = () => {
  const router = useRouter();
  const id = router.query.id?.[0];

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <SuscripcionDetails id={id} />;
};

export default withAuth(SuscripcionDetailsPage);
