import React from "react";
import Link from "next/link";
import styles from "./menu.module.css";

type MenuProps = {
  isAuthenticated: boolean;
  logout: () => void;
}
const links = [
  {title:"Home",path:"/",icon:""},
  {title:"Sujetos",path:"/sujetos",icon:""},
  {title:"Planes",path:"/plans",icon:""},
  {title:"Suscripciones",path:"/suscripciones",icon:""},
  
]

const Menu: React.FC<MenuProps> = ({ isAuthenticated, logout }) => (
  <nav className={styles.menu}>
    <ul>
      <li>
        <Link href="/">
          Home
        </Link>
      </li>
      <li>
        <Link href="/sujetos">
          Sujetos
        </Link>
      </li>      
      <li>
        <Link href="/plans">
          Plan
        </Link>
      </li>
      <li>
        <Link href="/suscripciones">
          Suscripciones
        </Link>
      </li>
      {isAuthenticated && (
        <li>
          <Link href="" onClick={logout}>Logout</Link>
        </li>
      )}
    </ul>
  </nav>
);

export default Menu;