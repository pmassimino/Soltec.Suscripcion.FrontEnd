import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "@/services/apiService";
import { Sujeto } from '@/models/model';
import Layout from '@/componets/Layout';

type Props = {
  id: string;
};

const Details = ({ id }: Props) => {
  const router = useRouter();
  const [entity, setEntity] = useState<Sujeto | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleGoBack = async () => {
    router.push(`/sujetos/`);
  };

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    apiService.get<Sujeto>(`/sujeto/${id}`).then((fetched) => {
      setEntity(fetched);
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  if (!entity) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title={`Detalle Plan #${entity.id}`}>
        {errorMessage && <p>{errorMessage}</p>}
        <div>Codigo :{entity.id}</div>
        <div>Nombre: {entity.nombre}</div>      
        <div>Domicilio: {entity.domicilio}</div>  
        <div>Localidad: {entity.localidad}</div>   
        <div>Codigo Postal: {entity.codigoPostal}</div>     
        <div>CUIT: {entity.numeroDocumento}</div>          
        <button onClick={handleGoBack}>Volver</button>
        
      </Layout>
    </>
  );
};

export default Details;
