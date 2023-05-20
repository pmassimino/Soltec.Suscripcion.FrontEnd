
import { useRouter } from 'next/router';
import { withAuth } from '@/componets/withAuth/withAuth';
import SuscripcionEdit from './edit';

const SuscripcionEditPage = () => {
  const router = useRouter();
  const id = router.query.id?.[0];

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <SuscripcionEdit id={id} />;
};

export default withAuth(SuscripcionEditPage);
