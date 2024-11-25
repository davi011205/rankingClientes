import React from 'react';

const listarCliente = ({ clientes, onVerHistorico }) => {
  return (
    <div className="listarClientesContainer">
      <h3>Lista de Clientes</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Histórico de Compras</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>
                <button onClick={() => onVerHistorico(cliente.id)}>Ver Histórico</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default listarCliente;
