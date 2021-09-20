import { SERVER_IP } from "config";
import { usePageDeleteModal } from "context/usePageDeleteModal";
import { usePageUpdateModal } from "context/usePageUpdateModal";
import { Button, Table } from "reactstrap";

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
              >
                <i className="fas fa-edit text-info"></i>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setDeleteItemId(catalogo.id);
                  setDeleteModalOpen(true);
                }}
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
