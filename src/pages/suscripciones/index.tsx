import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Suscripcion } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";


const SuscripcionIndex = () => {
  const [entities, setEntities] = useState<Suscripcion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEntities = entities.filter((p) =>
  p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));


  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const apiUrl  = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    apiService.get<Suscripcion[]>("/suscripcion/view").then((data) => setEntities(data));
    const storedSearchValue = localStorage.getItem("searchTermSuscripçion");
    if (storedSearchValue) {
      setSearchTerm(storedSearchValue);
    }
  }, []);
  //cuando cambia actualizar busqueda
  useEffect(() => {
    localStorage.setItem("searchTermSuscripcion", searchTerm);
  }, [searchTerm]);

  return (
    <Layout title='Suscripciones'>
      <h1>Suscripciones</h1>
      <div>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchFilterChange}
      />
      </div>
      <div>
      <Link href="/suscripciones/create">
        Crear nueva
      </Link>
      </div>
    <table>
  <thead>
    <tr>
      <td>Id</td>
      <th>Cuenta</th>
      <th>Nombre</th>
      <th>Plan</th>
      <th>Importe</th>
      <th>Estado</th>
      <td></td>
    </tr>
  </thead>
  <tbody>
    {filteredEntities.map((entity) => (
      <tr key={entity.id}>
        <td>{entity.id}</td>
        <td>{entity.idCuenta}</td>
        <td>{entity.nombre}</td>
        <td>{entity.plan}</td>
        <td>{entity.importe}</td>
        <td>{entity.estado}</td>
        <td><a href={`/suscripciones/${entity.id}/details`}>Detalle</a></td>
      </tr>
    ))}
  </tbody>
</table>
    </Layout>
  );
};

export default withAuth(SuscripcionIndex);