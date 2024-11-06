import React, { useState } from 'react';
import { auth, db } from '../scripts/firebaseConfig'; // Certifique-se de importar o auth e db
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'; // Importa funções do Firestore
import { useNavigate } from 'react-router-dom';
import './login.css';
const emailAdm1 = import.meta.env.VITE_EMAIL_ADM1;
const emailAdm2 = import.meta.env.VITE_EMAIL_ADM2;

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [nome, setNome] = useState('');

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;

      // Referência ao documento do usuário no Firestore
      const userDocRef = doc(db, 'clientes', user.uid);

      // Verifica se o documento já existe (se é a primeira vez que o usuário faz login)
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // Se não existir, cria o documento com campos iniciais
        await setDoc(userDocRef, {
          nome: nome,
          pontosTotais: 0,
          pontos: [],  // Inicializa o array de pontos
          email: email,
        });
      }  else {
        // Atualiza o nome apenas se o campo nome estiver preenchido
        if (nome) {
          await updateDoc(userDocRef, { nome: nome });
        }
      }

      // Verifica se o email corresponde ao administrador e redireciona para a rota apropriada
      if (email === emailAdm1 || email === emailAdm2 ) {
        navigate('/adm');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='containerLogin'>
      <div className="titulo">
        <h1>Bem Vinda(o)!</h1>
        <h1>Promoção Ranking de Natal</h1>
        <span>
          <svg style={{width: '20px', marginRight: '4px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#B197FC" d="M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z"/></svg>      
            válida de 01/11 à 20/12
          <svg style={{width: '20px', marginLeft: '4px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#B197FC" d="M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z"/></svg>      
        </span>
      </div>
      <div className="login">
        <div className='nomeCliente'>
          <label htmlFor="nome">1º acesso: Insira seu nome</label>
          <input type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className='button' onClick={handleGoogleLogin}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="#ffffff" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>        
          Entrar com Google
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
