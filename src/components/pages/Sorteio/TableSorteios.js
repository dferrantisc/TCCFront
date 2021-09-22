import { Button, Table, UncontrolledTooltip } from "reactstrap";
import Link from "next/link";

import { usePageDeleteModal } from "context/usePageDeleteModal";
import { usePageUpdateModal } from "context/usePageUpdateModal";
import { SERVER_IP } from "config";

export function TableSorteios({ sorteios }) {
  const { setUpdateModalOpen, setItem } = usePageUpdateModal();
  const { setDeleteModalOpen, setDeleteItemId } = usePageDeleteModal();

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col" style={{ width: "20%" }}>
            Imagem
          </th>
          <th scope="col" style={{ width: "20%" }}>
            Nome
          </th>
          <th scope="col" style={{ width: "40%" }}>
            Descricao
          </th>
          <th scope="col" style={{ width: "10%" }}>
            Quantidade de ganhadores
          </th>
          <th scope="col" style={{ width: "10%" }}>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {sorteios.map((sorteio) => (
          <tr key={sorteio.idsort}>
            <td>
              <img
                src={`${SERVER_IP}/images/${sorteio.imagem}`}
                width="150"
                height="150"
              />
            </td>
            <td>
              <span className="mb-0 text-sm">{sorteio.nome}</span>
            </td>
            <td>
              <span className="mb-0 text-sm">{sorteio.descricao}</span>
            </td>
            <td>{sorteio.quantidade_ganhadores}</td>

            <td>
              <Link href={`/admin/sorteios/${sorteio.idsort}`}>
                <Button size="sm" id="detailsButton">
                  <i className="fas fa-eye text-success"></i>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="detailsButton"
                  >
                    Detalhes
                  </UncontrolledTooltip>
                </Button>
              </Link>

              <Button
                size="sm"
                onClick={() => {
                  setItem(sorteio);
                  setUpdateModalOpen(true);
                }}
                id="infoButton"
              >
                <i className="fas fa-edit text-info"></i>
                <UncontrolledTooltip placement="bottom" target="infoButton">
                  Editar
                </UncontrolledTooltip>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setDeleteItemId(sorteio.idsort);
                  setDeleteModalOpen(true);
                }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
