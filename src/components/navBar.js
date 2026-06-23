import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./navBar.css";

const Navbar = ({ toggleDarkMode }) => {
  return (
    <nav className="navbar">
  
  {/* ESQUERDA */}
  <div>
    <DarkModeToggle />
  </div>

  {/* DIREITA */}
  <div className="nav-buttons">
    <Link to="/">
      <button className="btn-nav">Home</button>
    </Link>

    <Link to="/tarefasIa">
      <button className="btn-nav">TAREFAS POR IA</button>
    </Link>
  </div>

</nav>
  );
};

export default Navbar;