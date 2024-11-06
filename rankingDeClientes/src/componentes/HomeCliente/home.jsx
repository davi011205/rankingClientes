import React, { useEffect, useState } from 'react';
import { db } from '../scripts/firebaseConfig'; // Importa a configuração do Firestore
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../HomeCliente/home.css';

const HomeCliente = () => {
  const [historicoPontos, setHistoricoPontos] = useState([]);
  const [showHistorico, setShowHistorico] = useState(false);
  const [rankingClientes, setRankingClientes] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  
  // Carregar e organizar ranking de todos os clientes
  const fetchRankingClientes = async () => {
    const clientesSnapshot = await getDocs(collection(db, 'clientes'));
    const clientesData = clientesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        nome: data.nome,
        pontosTotais: data.pontosTotais || 0, // Usando o campo pontosTotais
      };
    });

    // Ordena clientes por pontos em ordem decrescente
    clientesData.sort((a, b) => b.pontosTotais - a.pontosTotais);
    setRankingClientes(clientesData.slice(0, 10)); // Atualiza o estado com o ranking de clientes limitando a 10
  };


  // Carregar histórico do cliente logado
  useEffect(() => {
    const fetchHistoricoPontos = async () => {
      const user = auth.currentUser; // Obtém o usuário logado
      
      if (user) {
        const clienteRef = doc(db, 'clientes', user.uid); // Referência ao documento do cliente logado
        const clienteDoc = await getDoc(clienteRef); // Obtém os dados do cliente

        if (clienteDoc.exists()) {
          const dadosCliente = clienteDoc.data();
          const pontosArray = dadosCliente.pontos || []; // Acessa o array de pontos do cliente
          
          console.log('dados pontosArry: ')
          console.log(pontosArray); // Verifique a estrutura do array de pontos

          // Mapeia o histórico para o formato necessário
          const historicoArray = pontosArray.map((ponto) => ({
            dataPonto: new Date(ponto.dataPonto.seconds * 1000).toLocaleDateString(), // Converte timestamp para data legível
            quantidadePonto: ponto.quantidadePonto,
          }));
          setHistoricoPontos(historicoArray); // Atualiza o estado com o histórico de pontos
        }
      }
    };

    fetchHistoricoPontos(); // Chama a função para buscar o histórico
  }, [auth.currentUser]);

  // Carregar e organizar ranking de todos os clientes
  useEffect(() => {
    fetchRankingClientes();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redireciona para a página de login após logout
    } catch (error) {
      console.error("Erro ao sair:", error.message);
    }
  };

  return (
    <div className="homeContainer">
      <header>
        <div className='historico' onClick={() => setShowHistorico(!showHistorico)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
          {showHistorico && (
          <div className="displayHistorico">
            <div className="historicoPontos">
              <div className="tituloHistorico">
                <h3>Histórico de Pontos</h3>  
              </div>
              <div className="tabelaHistorico">
                {historicoPontos.length === 0 ? (
                  <p>Não há histórico de pontos disponível.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Data da Compra</th>
                        <th>Pontos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicoPontos.map((item, index) => (
                        <tr key={index}>
                          <td>{item.dataPonto}</td>
                          <td>{item.quantidadePonto}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          )}
        </div>
          <h2>Promoção Top 10 de natal</h2>
          <div onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg></div>
      </header>

      <main>
        <div className="ranking">
          <h3>Ranking de Clientes</h3>
          <table>
            <caption onClick={fetchRankingClientes}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#B197FC" d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/></svg></caption>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rankingClientes.map((cliente, index) => (
                <tr key={index}>
                  <td className='posicao'>
                    {
                      index == 0 ? (
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffd700" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg></span>
                      ) : index == 1 ? (
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#cd7f32" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg></span>

                      ) : index == 2 ? (
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#979da3" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg></span>

                      ) : (
                        index + 1
                      )
                    }
                  </td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.pontosTotais}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HomeCliente;
