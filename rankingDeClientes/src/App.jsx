import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './componentes/ProtectedRoute'; 
import Login from './componentes/Login/login'; 
import Home from './componentes/HomeCliente/home'; 
import CadastroCliente from './componentes/Adm/cadastroCliente'; 
import CadastroPontos from './componentes/Adm/cadastroPontos'; 
import EditarPontos from './componentes/Adm/editaPontos'; 
import EditarCliente from './componentes/Adm/editarCliente'; 
import Adm from './componentes/Adm/homeAdm'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/home" 
          element = {
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/cadCliente" element={<CadastroCliente />} />
        <Route path="/cadProduto" element={<CadastroPontos />} />
        <Route path="/editCliente" element={<EditarCliente />} />
        <Route path="/editProduto" element={<EditarPontos />} />
        <Route path="/adm"
          element = {
            <ProtectedRoute>
              <Adm />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
