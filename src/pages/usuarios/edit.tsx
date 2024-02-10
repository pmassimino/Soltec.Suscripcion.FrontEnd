import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Plan, Sujeto, Suscripcion, Usuario } from '../../models/model';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import SuscripcionForm from '../../componets/suscripciones/forms';
import BackEndError, { ErrorItem } from '@/utils/errors';
import UsuarioForm from '@/componets/usuarios/forms';

interface EditProps {
  id: string;
}

const UsuarioEdit = ({ id }: EditProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entity, setEntity] = useState<Usuario>();
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);

    const fetchEntity = async () => {
      try {
        const entity = await apiService.get<Usuario>(`/Usuario/${id}`);
        setEntity(entity);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };    
    fetchEntity();    
  }, [id]);

  const handleSubmit = async (entity: Usuario) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.put<Usuario>(`/usuario/${id}`, entity);
      router.push(`/usuarios/`);
    } catch (error) {
      if (error instanceof BackEndError)            
         setErrorList(error.errors);    
    }
    setIsSubmitting(false);
  };

  if (!entity) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title='Editar Usuario'>
        <h1>Editar</h1>
        <UsuarioForm entity={entity}  onSubmit={handleSubmit} isSubmitting={isSubmitting} errorList={errorList} />        
      </Layout>
    </>
  );
};

export default UsuarioEdit;
