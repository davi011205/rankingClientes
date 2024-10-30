// Adm.js
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Adm = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redireciona para a página de login após logout
    } catch (error) {
      console.error("Erro ao sair:", error.message);
    }
  };

  return (
    <div className="admContainer">
      <header>
        <h2 style={{fontSize: '100px'}}>Área Administrativa</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      {/* Conteúdo do componente Adm */}
    </div>
  );
};

export default Adm;
