import { useEffect, useState } from "react";
import Link from "next/link";
import ApiService from "../../../services/apiService";
import { Usuario, UsuarioCuenta } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import { useRouter } from 'next/router';
import BackEndError, { ErrorItem } from "@/utils/errors";
import ErrorList from "@/componets/errorList";
const CuentasIndex = () => {
  const [entities, setEntities] = useState<UsuarioCuenta[]>([]);
  const [usuario, setUsuario] = useState<Usuario>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);
  const [errorList,setErrorList] = useState<ErrorItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false); // Nuevo estado para indicar si se está cargando la lista
  const router = useRouter();
  //const id = router.query.id?.[0];
  //const id = router.query.id?.[0]; // Puede ser una cadena o undefined
  const id = router.query.id as string;

  // Verificar si id es definido y no es null
  const parsedId = id ? parseInt(id, 10) : undefined;

  const filteredEntities = entities.filter((p) =>
    p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
    const handleDelete = async (data: UsuarioCuenta) => {     
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta cuenta?');
    if (!confirmDelete) {
      return;
    }
      const apiUrl = process.env.API_URL ?? '';    
      const apiService = new ApiService(apiUrl);
      let newEntity: UsuarioCuenta;
      try {
        setIsSubmitting(true);
        newEntity = await apiService.delete<UsuarioCuenta>('/usuario/' + id + '/delCuenta',data);
        fetchUsuariosCuentas();
        router.push(`/usuarios/${id}/cuentas`);
      } catch (error ) {
        if (error instanceof BackEndError)            
           setErrorList(error.errors);          
      }
      setIsSubmitting(false);   
    };
  

    const fetchUsuariosCuentas = async () => {
      if (id) {
        const apiUrl = process.env.API_URL ?? "";
        const apiService = new ApiService(apiUrl);
        setIsLoading(true); // Iniciar la carga
        try {
          const data = await apiService.get<UsuarioCuenta[]>(`/usuario/${id}/cuentas`);
          setEntities(data);
          const dataUsuario = await apiService.get<Usuario>(`/usuario/${id}`);
          setUsuario(dataUsuario);
        } catch (error) {
          // Manejo de errores, si es necesario
        } finally {
          setIsLoading(false); // Finalizar la carga
        }
      }
    };
    
    useEffect(() => {
      fetchUsuariosCuentas(); // Llamar a la función para obtener la lista de cuentas al iniciar el componente
    }, [id]);

  useEffect(() => {
    localStorage.setItem("searchTermUsuarioCuenta", searchTerm);
  }, [searchTerm]);

  return (
    <Layout title="Cuentas Vinculadas">      
      <h1>Cuentas Vinculadas</h1>
      <div>
        <div>Usuario : {usuario?.nombre}</div>
        <div>email : {usuario?.email}</div>
        <div>estado : {usuario?.estado}</div>
      </div>
      <div>
      <Link href={`/usuarios/${id}/addCuenta`}>
            Crear nueva
      </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearchFilterChange}
        />
      </div>
      <table>
        <thead>
          <tr>            
            <th>IdCuenta</th>
            <th>Nombre</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {filteredEntities.map((entity) => (
            <tr key={entity.idUsuario}>
              <td>{entity.idCuenta}</td>
              <td>{entity.nombre}</td>
              <td><button onClick={() => handleDelete(entity)}>Eliminar</button></td>              
            </tr>
          ))}
        </tbody>
      </table>
      <ErrorList errorList={errorList}></ErrorList> 
    </Layout>
  );
};

export default withAuth(CuentasIndex);
