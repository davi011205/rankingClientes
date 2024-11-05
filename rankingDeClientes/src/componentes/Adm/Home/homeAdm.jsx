// Adm.js
import React, {useState} from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './homeAdm.css';
import CadastroPontos from '../Pontos/cadastroPontos';

const Adm = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [showCadastroPontos, setShowCadastroPontos] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redireciona para a página de login após logout
    } catch (error) {
      console.error("Erro ao sair:", error.message);
    }
  };

  const handleCadastrarPontos = () => {
    setShowCadastroPontos(true); // Muda o estado para mostrar o componente de cadastro de pontos
  };

  return (
    <div className="admContainer">
      <header>
          <div onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg></div>
          <h2>Promoção Top 10 de natal</h2>
      </header>
      <main>
        <div className='opcoesAdm' onClick={handleCadastrarPontos}>Cadastrar Pontos</div>
        <div className='opcoesAdm'>CadastrarCliente</div>
        <div className='opcoesAdm'>Lista de Clientes</div>

        {showCadastroPontos && <CadastroPontos />} {/* Renderiza o componente de cadastro de pontos se o estado for verdadeiro */}
      </main>
    </div>
  );
};

export default Adm;
