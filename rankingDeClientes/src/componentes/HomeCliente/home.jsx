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


  // Carregar histórico do cliente logado
  useEffect(() => {
    const fetchHistoricoPontos = async () => {
      const user = auth.currentUser; // Obtém o usuário logado
      
      if (user) {
        console.log(user)
        const clienteRef = doc(db, 'clientes', user.uid); // Referência ao documento do cliente logado
        const clienteDoc = await getDoc(clienteRef); // Obtém os dados do cliente

        if (clienteDoc.exists()) {
          const dadosCliente = clienteDoc.data();
          console.log('dados clientes: ')
          console.log(dadosCliente); // Adicione este log para verificar os dados

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
      setRankingClientes(clientesData); // Atualiza o estado com o ranking de clientes
    };

    fetchRankingClientes(); // Chama a função para buscar o ranking
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
                  <td>{index + 1}</td>
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
