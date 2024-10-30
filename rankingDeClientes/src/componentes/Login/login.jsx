import React, { useState } from 'react';
import { auth, db } from '../scripts/firebaseConfig'; // Certifique-se de importar o auth e db
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Importa funções do Firestore
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;

      // Extrai o nome do email (parte antes do @)
      const nome = email.split('@')[0];

      // Referência ao documento do usuário no Firestore
      const userDocRef = doc(db, 'clientes', user.uid);

      // Verifica se o documento já existe (se é a primeira vez que o usuário faz login)
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // Se não existir, cria o documento com campos iniciais
        await setDoc(userDocRef, {
          nome: nome,
          pontosTotais: 0,
          pontos: [], // Inicializa o array de pontos
        });
      }

      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='containerLogin'>
      <div className="titulo">
        <h1>Bem Vinda(o)!</h1>
        <h1>Promoção Ranking de Natal</h1>
        <span>válida de 01/11 à 20/12</span>
      </div>
      <div className="button" onClick={handleGoogleLogin}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="#ffffff" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>        
        Entrar com Google
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
