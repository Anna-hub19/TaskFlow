import React from "react";
import Navbar from "./components/navBar";
import Home from "./paginas/home";
import { Routes, Route } from "react-router-dom";
import TarefasIa from "./paginas/ia";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarefasIa" element={<TarefasIa/>} />
      </Routes>
    </>
  );
};

export default App;