import React, { useState, useEffect, ReactNode } from "react";
import Menu from "../componets/menu/menu";
import { getToken, setToken } from "../services/auth";
import { useRouter } from "next/router";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

function Layout({ children, title = "" }: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token); // !! convierte el valor en un booleano
  }, []);

  function handleLogout() {
    // código para cerrar sesión
    setToken("");
    const router = useRouter();
    router.replace("/login");
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div>
          <Menu isAuthenticated={isAuthenticated} logout={handleLogout} />
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}

export default Layout;
