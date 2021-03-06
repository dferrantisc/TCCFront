import { Table } from "reactstrap";

export function TableParticipantesSorteio({ participantes }) {
  if (participantes.length < 1) return <div>Nenhum cliente participando</div>;

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
          {participantes.map((participante) => (
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
