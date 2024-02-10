import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Usuario } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";
import router from "next/router";
import BackEndError, { ErrorItem } from "@/utils/errors";
import ErrorList from "@/componets/errorList";


const UsuarioIndex = () => {
  const [entities, setEntities] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorList,setErrorList] = useState<ErrorItem[]>([])
  
  const filteredEntities = entities.filter((p) =>
  p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));


  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (data: Usuario) => {     
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta cuenta?');
    if (!confirmDelete) {
      return;
    }
      const apiUrl = process.env.API_URL ?? '';    
      const apiService = new ApiService(apiUrl);
      let newEntity: Usuario;
      try {        
        newEntity = await apiService.delete<Usuario>('/usuario/' + data.id  ,data);
        fetchUsuarios();
        router.push(`/usuarios/`);
      } catch (error ) {
        if (error instanceof BackEndError)            
           setErrorList(error.errors);          
      }      
    };

  const fetchUsuarios = ()=>
  {
    const apiUrl  = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    apiService.get<Usuario[]>("/usuario/").then((data) => setEntities(data));
  }  
  useEffect(() => {
    fetchUsuarios();
    const storedSearchValue = localStorage.getItem("searchTermUsuario");
    if (storedSearchValue) {
      setSearchTerm(storedSearchValue);
    }
  }, []);
  //cuando cambia actualizar busqueda
  useEffect(() => {
    localStorage.setItem("searchTermUsuario", searchTerm);
  }, [searchTerm]);

  return (
    <Layout title='Usuarios'>
      <h1>Usuarios</h1>
      <div>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchFilterChange}
      />
      </div>  
      <ErrorList errorList={errorList}></ErrorList>   
    <table>
  <thead>
    <tr>
      <td>Id</td>      
      <th>Nombre</th>
      <th>email</th>
      <th>Estado</th>      
      <td></td>
      <td></td>
    </tr>
  </thead>
  <tbody>
    {filteredEntities.map((entity) => (
      <tr key={entity.id}>
        <td>{entity.id}</td>
        <td>{entity.nombre}</td>
        <td>{entity.email}</td>
        <td>{entity.estado}</td>    
        <td><a href={`/usuarios/${entity.id}`}>Editar</a></td>     
        <td><a href={`/usuarios/${entity.id}/cuentas`}>Cuentas</a></td>
        <td><button onClick={() => handleDelete(entity)}>Eliminar</button></td>              
      </tr>
    ))}
  </tbody>
</table>
    </Layout>
  );
};

export default withAuth(UsuarioIndex);