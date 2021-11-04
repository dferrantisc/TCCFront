import { SERVER_IP } from "config";
import { usePageDeleteModal } from "context/usePageDeleteModal";
import { usePageUpdateModal } from "context/usePageUpdateModal";
import { Button, Table, UncontrolledTooltip } from "reactstrap";

export function TableCatalogos({ catalogos }) {
  const { setUpdateModalOpen, setItem } = usePageUpdateModal();
  const { setDeleteModalOpen, setDeleteItemId } = usePageDeleteModal();

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col" style={{ width: "20%" }}>
            Imagem
          </th>
          <th scope="col" style={{ width: "30%" }}>
            Nome
          </th>
          <th scope="col" style={{ width: "30%" }}>
            Descrição
          </th>
          <th scope="col" style={{ width: "10%" }}>
            Preço
          </th>
          <th scope="col" style={{ width: "20%" }}>
            Categoria
          </th>
          <th scope="col" style={{ width: "10%" }}>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {catalogos.map((catalogo) => (
          <tr key={catalogo.idcatg}>
            <td>
              <img
                src={`${SERVER_IP}/images/${catalogo.img}`}
                width="150"
                height="150"
              />
            </td>
            <td>
              <span className="mb-0 text-sm">{catalogo.nome}</span>
            </td>
            <td>
              <span className="mb-0 text-sm">{catalogo.descricao}</span>
            </td>
            <td>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(catalogo.preço)}
            </td>

            <td>{catalogo.categoria.nome}</td>
            <td>
              <Button
                size="sm"
                onClick={() => {
                  setItem(catalogo);
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
                  setDeleteItemId(catalogo.id);
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
