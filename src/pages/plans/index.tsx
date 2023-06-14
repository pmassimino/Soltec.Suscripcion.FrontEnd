import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Plan } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";
import BackEndError, { ErrorItem } from "@/utils/errors";
import ErrorList from "@/componets/errorList";


const PlanIndex = () => {
  const [entities, setEntities] = useState<Plan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  const apiUrl = process.env.API_URL ?? '';    
  const apiService = new ApiService(apiUrl);      
  
  const filteredEntities = entities.filter((p) =>
  p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));


  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleDelete = async (data: Plan) => {     
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta cuenta?');
    if (!confirmDelete) {
      return;
    }     
      try {        
        await apiService.delete<Plan>('/plan/' + data.id  ,null);
        fetchPlan();        
      } catch (error ) {
        if (error instanceof BackEndError)            
           setErrorList(error.errors);          
      }      
    };

const fetchPlan = (()=>
{
  apiService.get<Plan[]>("/plan").then((data) => setEntities(data));
});

  useEffect(() => {        
    fetchPlan();
    const storedSearchValue = localStorage.getItem("searchTerm");
    if (storedSearchValue) {
      setSearchTerm(storedSearchValue);
    }
  },[]);
  //cuando cambia actualizar busqueda
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  return (
    <Layout title='Planes'>
      <h1>Planes</h1>
      <div>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchFilterChange}
      />
      </div>
      <div>
      <Link href="/plans/create">
        Crear nuevo plan
      </Link>
      </div>
    <table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Nombre</th>
      <td></td>
      <td></td>
    </tr>
  </thead>
  <tbody>
    {filteredEntities.map((entity) => (
      <tr key={entity.id}>
        <td>{entity.id}</td>
        <td>{entity.nombre}</td>
        <td><a href={`/plans/${entity.id}`}>Editar</a></td>        
        <td><button onClick={() => handleDelete(entity)}>Eliminar</button></td>
      </tr>
    ))}    
  </tbody>
</table>
<ErrorList errorList={errorList}></ErrorList>
</Layout>
  );
};

export default withAuth(PlanIndex);