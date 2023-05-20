import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Plan } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";


const PlanIndex = () => {
  const [entities, setEntities] = useState<Plan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEntities = entities.filter((p) =>
  p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));


  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const apiUrl  = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    apiService.get<Plan[]>("/plan").then((data) => setEntities(data));
    const storedSearchValue = localStorage.getItem("searchTerm");
    if (storedSearchValue) {
      setSearchTerm(storedSearchValue);
    }
  }, []);
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
    </tr>
  </thead>
  <tbody>
    {filteredEntities.map((entity) => (
      <tr key={entity.id}>
        <td>{entity.id}</td>
        <td>{entity.nombre}</td>
        <td><a href={`/plans/${entity.id}/details`}>Detalle</a></td>
      </tr>
    ))}
  </tbody>
</table>
    </Layout>
  );
};

export default withAuth(PlanIndex);