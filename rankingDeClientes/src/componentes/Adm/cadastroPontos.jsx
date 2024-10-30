const cadastroPontos = () => {
  
    return (
      cadastroPontos
    );
  };
  
  export default cadastroPontos;


//   import React, { useEffect, useState } from 'react';
// import { db } from '../scripts/firebaseConfig'; // Importar o Firestore configurado
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// const CadastrarPontos = () => {
//   const [clientes, setClientes] = useState([]);
//   const [selectedCliente, setSelectedCliente] = useState('');
//   const [valorVenda, setValorVenda] = useState(0);
//   const [dataVenda, setDataVenda] = useState('');
//   const [multiplicador, setMultiplicador] = useState(1);
//   const [pontosGerados, setPontosGerados] = useState(0);

//   // Função para carregar os clientes da coleção 'clientes'
//   useEffect(() => {
//     const fetchClientes = async () => {
//       const clientesSnapshot = await getDocs(collection(db, 'clientes'));
//       const clientesData = clientesSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setClientes(clientesData);
//     };

//     fetchClientes();
//   }, []);

//   // Atualiza os pontos gerados quando valorVenda ou multiplicador mudam
//   useEffect(() => {
//     const pontos = valorVenda * multiplicador;
//     setPontosGerados(pontos);
//   }, [valorVenda, multiplicador]);

//   // Função para salvar os pontos no cliente selecionado
//   const handleSalvarPontos = async () => {
//     if (!selectedCliente || !dataVenda || !valorVenda) {
//       alert('Preencha todos os campos!');
//       return;
//     }

//     const clienteRef = doc(db, 'clientes', selectedCliente);
//     const pontosData = { [dataVenda]: pontosGerados };

//     try {
//       await updateDoc(clienteRef, {
//         pontos: pontosData, // Adiciona a data e pontos ao campo 'pontos'
//       });
//       alert('Pontos salvos com sucesso!');
//     } catch (error) {
//       console.error('Erro ao salvar pontos:', error);
//       alert('Erro ao salvar pontos');
//     }
//   };

//   return (
//     <div>
//       <h2>Cadastrar Pontos</h2>

//       <label>Selecione o Cliente:</label>
//       <select
//         value={selectedCliente}
//         onChange={(e) => setSelectedCliente(e.target.value)}
//       >
//         <option value="">Selecione um cliente</option>
//         {clientes.map((cliente) => (
//           <option key={cliente.id} value={cliente.id}>
//             {cliente.nome}
//           </option>
//         ))}
//       </select>

//       <label>Valor da Venda:</label>
//       <input
//         type="number"
//         value={valorVenda}
//         onChange={(e) => setValorVenda(parseFloat(e.target.value))}
//       />

//       <label>Data da Venda:</label>
//       <input
//         type="date"
//         value={dataVenda}
//         onChange={(e) => setDataVenda(e.target.value)}
//       />

//       <label>Multiplicador de Pontos:</label>
//       <select
//         value={multiplicador}
//         onChange={(e) => setMultiplicador(parseFloat(e.target.value))}
//       >
//         <option value={1}>x1</option>
//         <option value={2}>x2</option>
//         <option value={3}>x3</option>
//       </select>

//       <label>Pontos Gerados:</label>
//       <input type="number" value={pontosGerados} readOnly />

//       <button onClick={handleSalvarPontos}>Salvar Pontos</button>
//     </div>
//   );
// };

// export default CadastrarPontos;
