import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import BackEndError, { ErrorItem } from '@/utils/errors';
import { Sujeto, UsuarioCuenta } from '@/models/model';
import AddCuentaForm from '../../../componets/usuarios/addCuentaForm';
import ApiService from '@/services/apiService';



const AddCuenta = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [entity, setEntity] = useState<UsuarioCuenta>();
  const [sujetos, setSujetos] = useState<Sujeto[]>([]);
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);

  const initialValue: UsuarioCuenta = {
    idUsuario: Number(id),
    idCuenta: '',
    usuario: null,
    nombre: 'Nombre de cuenta',
  };
  

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);    
    const fetchSujetos = async () => {
      try {
        const entity = await apiService.get<Sujeto[]>(`/sujeto`);
        setSujetos(entity);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };       
    fetchSujetos();
  }, );

  const handleSubmit = async (data: UsuarioCuenta) => {     
    const apiUrl = process.env.API_URL ?? '';    
    const apiService = new ApiService(apiUrl);
    let newEntity: UsuarioCuenta;
    try {
      setIsSubmitting(true);
      newEntity = await apiService.put<UsuarioCuenta>('/usuario/' + id + '/addCuenta', data);
      router.push(`/usuarios/${id}/cuentas`);
    } catch (error ) {
      if (error instanceof BackEndError)            
         setErrorList(error.errors);          
    }
    setIsSubmitting(false);   
  };
  
  return (
    <>
    <Layout title='Crear Nuevo '>
      <h1>Crear nueva suscripcion</h1>
      <AddCuentaForm onSubmit={handleSubmit} sujetos={sujetos}  entity={initialValue} errorList={errorList}  isSubmitting={isSubmitting}  />      
      </Layout>
    </>
  );
};

export default withAuth(AddCuenta);
