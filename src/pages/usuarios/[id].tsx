
import { useRouter } from 'next/router';
import { withAuth } from '@/componets/withAuth/withAuth';
import UsuarioEdit from './edit';

const UsuarioEditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <UsuarioEdit id={id} />;
};

export default withAuth(UsuarioEditPage);
