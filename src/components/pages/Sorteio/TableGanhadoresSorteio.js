import { Table } from "reactstrap";

export function TableGanhadoresSorteio({ ganhadores }) {
  if (ganhadores.length < 1) return <div>Sorteio em andamento</div>;

  return (
    <div style={{ maxHeight: "400px", overflow: "auto" }}>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col" style={{ width: "40%" }}>
              Nome
            </th>
            <th scope="col" style={{ width: "30%" }}>
              E-mail
            </th>
            <th scope="col" style={{ width: "30%" }}>
              Telefone
            </th>
          </tr>
        </thead>
        <tbody>
          {ganhadores.map((participante) => (
            <tr key={participante.iduc}>
              <td>
                <span className="mb-0 text-sm">{participante.nome}</span>
              </td>
              <td>
                <span className="mb-0 text-sm">{participante.email}</span>
              </td>
              <td>
                <span>{participante.telefone}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
