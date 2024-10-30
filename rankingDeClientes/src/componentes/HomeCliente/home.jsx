import React, { useEffect, useState } from 'react';
import { db } from '../scripts/firebaseConfig'; // Importa a configuração do Firestore
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../HomeCliente/home.css';

const HomeCliente = () => {
  const [historicoPontos, setHistoricoPontos] = useState([]);
  const [showHistorico, setShowHistorico] = useState(false);
  const [rankingClientes, setRankingClientes] = useState([]);
  const auth = getAuth();

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

  return (
    <div className="homeContainer">
      <header>
          <button onClick={() => setShowHistorico(!showHistorico)}>Ver histórico de pontos</button>
          <button>Sair</button>
          <h2>Promoção Top 10 de natal</h2>
      </header>

      <main>
        {showHistorico && (
        <div className="historicoPontos">
          <h3>Histórico de Pontos</h3>
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
        )}
        <div className="rankinkPodio"></div>
        <div className="ranking">
          <h3>Ranking de Clientes</h3>
          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Pontos Totais</th>
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
