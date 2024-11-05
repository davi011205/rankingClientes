import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './componentes/scripts/firebaseConfig'; // Importa o auth corretamente

import Login from './componentes/Login/login';
import Home from './componentes/HomeCliente/home';
import CadastroCliente from './componentes/Adm/Clientes/cadastroCliente';
import CadastroPontos from './componentes/Adm/Pontos/cadastroPontos';
import EditarPontos from './componentes/Adm/Pontos/editarPontos';
import EditarCliente from './componentes/Adm/Clientes/editarCliente';
import Adm from './componentes/Adm/Home/homeAdm';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listener para detectar mudanças na autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Remove o carregamento após verificar o estado
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Carregando...</p>; // Renderiza uma mensagem enquanto carrega o estado

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/cadCliente" element={user ? <CadastroCliente /> : <Navigate to="/" />} />
        <Route path="/cadProduto" element={user ? <CadastroPontos /> : <Navigate to="/" />} />
        <Route path="/editCliente" element={user ? <EditarCliente /> : <Navigate to="/" />} />
        <Route path="/editProduto" element={user ? <EditarPontos /> : <Navigate to="/" />} />
        <Route path="/adm" element={user ? <Adm /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
