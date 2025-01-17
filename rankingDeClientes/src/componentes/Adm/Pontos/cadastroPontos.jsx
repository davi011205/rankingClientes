import React, { useEffect, useState } from 'react'; 
import { db } from '../../scripts/firebaseConfig'; // Importar o Firestore configurado 
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import './pontos.css'
const cadastroPontos = () => {
  const [clientes, setClientes] = useState([]); 
  const [selectedCliente, setSelectedCliente] = useState(''); 
  const [valorVenda, setValorVenda] = useState(0); 
  const [dataVenda, setDataVenda] = useState(''); 
  const [multiplicador, setMultiplicador] = useState(1); 
  const [pontosGerados, setPontosGerados] = useState(0); 


  const handleLimpar = () => {
    setSelectedCliente('');
    setDataVenda('');
    setValorVenda(0);
    setMultiplicador(1);
    setPontosGerados(0);
  };

  // Função para carregar os clientes
  useEffect(() => {
    const fetchClientes = async () => {
      const clientesSnapshot = await getDocs(collection(db, 'clientes'));
      const clientesData = clientesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClientes(clientesData);
    };

    fetchClientes();
  }, []);

  // Funcao para calcular os pontos gerados pela venda
  useEffect(() => {
    const valorPonto = 50;
    const reaisPorPonto = 25;
    const pontos = (valorVenda / reaisPorPonto) * (valorPonto * multiplicador);

    setPontosGerados(Math.round(pontos));
  }, [valorVenda, multiplicador]);

  // Função para somar os pontos totais do cliente
  const calcularPontosTotais = (pontosArray) => {
    const soma = pontosArray.reduce((total, ponto) => total + ponto.quantidadePonto, 0);
    return soma;
  };

  // Função para salvar os pontos no cliente selecionado
  const handleSalvarPontos = async () => {
    if (!selectedCliente || !dataVenda || !valorVenda) {
      alert('Preencha todos os campos!');
      return;
    }

    const clienteRef = doc(db, 'clientes', selectedCliente);

    try {
      // Busca os dados do cliente para atualizar sem sobrescrever o array de pontos
      const clienteSnapshot = await getDoc(clienteRef);
      const clienteData = clienteSnapshot.data();

      // Se o cliente já tiver pontos, adicionamos os novos pontos ao array existente
      const novosPontos = clienteData.pontos ? [...clienteData.pontos, { dataPonto: dataVenda, quantidadePonto: pontosGerados }] : [{ dataPonto: dataVenda, quantidadePonto: pontosGerados }];
      
      // Calcula a soma total de pontos
      const pontosTotaisCalculado = calcularPontosTotais(novosPontos);

      // Atualiza o cliente no Firebase com os novos pontos e o pontosTotais
      await updateDoc(clienteRef, {
        pontos: novosPontos, 
        pontosTotais: pontosTotaisCalculado, 
      });

      alert('Pontos salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar pontos:', error);
      alert('Erro ao salvar pontos');
    }
  };


  return (
      <div className='containerCadPontos'>
        <h2>Cadastrar Pontos</h2>

        <div className="formCadPontos">
          <div id='cliente'>
            <label>Selecione o Cliente:</label>
            <select
              value={selectedCliente}
              onChange={(e) => setSelectedCliente(e.target.value)}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div id='venda'>
            <div>
              <label>Data da Venda:</label>
              <input
                type="date"
                value={dataVenda}
                onChange={(e) => setDataVenda(e.target.value)}
              />
            </div>
            <div>
              <label>Valor:</label>
              <input
                type="number"
                value={valorVenda}
                onChange={(e) => setValorVenda(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div id='pontos'>
            <div>
              <label>Multiplicador:</label>
              <select
                value={multiplicador}
                onChange={(e) => setMultiplicador(parseFloat(e.target.value))}
              >
                <option value={1}>x1</option>
                <option value={2}>x2</option>
                <option value={3}>x3</option>
              </select>
            </div>

            <div>
              <label>Pontos Gerados:</label>
              <input type="number" value={pontosGerados} readOnly />
            </div>
          </div>

          <div id="botoes">
            <button onClick={handleSalvarPontos}>Salvar Pontos</button>
            <button onClick={handleLimpar}>Limpar</button>
          </div>
        </div>
      </div>
  );
};

export default cadastroPontos;
