// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ children, adminOnly }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // Se o usuário não está logado, redireciona para a página de login
    return <Navigate to="/" />;
  }

  // Verifica se o usuário é um administrador e redireciona para o painel de admin
  if (adminOnly && user.email === 'davias01122005@gmail.com') {
    return <Navigate to="/adm" />;
  }

  return children;
};

export default ProtectedRoute;
