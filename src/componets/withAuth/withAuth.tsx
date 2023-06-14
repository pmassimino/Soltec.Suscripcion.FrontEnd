import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken,isTokenExpired,isAdmin } from '../../services/auth';

interface Props {
  
}

export function withAuth<P extends Props>(Component: React.ComponentType<P>) {
  const AuthenticatedComponent: React.FC<P> = (props: P) => {
    const router = useRouter();
    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.push('/login');
      }
      else if (isTokenExpired(token)) {
        // Si el token está vencido, redirige al usuario a la página de inicio de sesión.
        router.push('/login');
      }
      else if (!isAdmin()) {
        router.push('/unauthorized'); // Redirige al componente Unauthorized si el usuario no es administrador
      }
    }, [router]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
}
