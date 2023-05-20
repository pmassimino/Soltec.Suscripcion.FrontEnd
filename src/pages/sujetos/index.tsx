import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Sujeto } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";


const Index = () => {
  const entityName="sujeto";
  const [entities, setEntities] = useState<Sujeto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEntities = entities.filter((p) =>
  p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));


  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const apiUrl  = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    apiService.get<Sujeto[]>("/sujeto").then((data) => setEntities(data));
    const storedSearchValue = localStorage.getItem("searchTerm" + entityName);
    if (storedSearchValue) {
      setSearchTerm(storedSearchValue);
    }
  }, []);
  //cuando cambia actualizar busqueda
  useEffect(() => {
    localStorage.setItem("searchTerm" + entityName, searchTerm);
  }, [searchTerm]);

  return (
    <Layout title='Sujetos'>
      <h1>Sujetos</h1>
      <div>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchFilterChange}
      />
      </div>
      <div>      
      </div>
    <table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Nombre</th>
      <th>CUIT</th>
      <td></td>
    </tr>
  </thead>
  <tbody>
    {filteredEntities.map((entity) => (
      <tr key={entity.id}>
        <td>{entity.id}</td>
        <td>{entity.nombre}</td>
        <td>{entity.numeroDocumento}</td>
        <td><a href={`/sujetos/${entity.id}/details`}>Detalle</a></td>
      </tr>
    ))}
  </tbody>
</table>
    </Layout>
  );
};

export default withAuth(Index);