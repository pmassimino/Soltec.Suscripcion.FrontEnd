import { useRouter } from 'next/router';
import Details from '../details';
import { withAuth } from '@/componets/withAuth/withAuth';

const DetailsPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <Details id={id} />;
};

export default withAuth(DetailsPage);
