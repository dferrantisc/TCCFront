import { usePageDeleteModal } from "context/usePageDeleteModal";
import { usePageUpdateModal } from "context/usePageUpdateModal";
import { Button, Table, UncontrolledTooltip } from "reactstrap";

export function TableCategories({ categories }) {
  const { setUpdateModalOpen, setItem } = usePageUpdateModal();
  const { setDeleteModalOpen, setDeleteItemId } = usePageDeleteModal();

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col" style={{ width: "70%" }}>
            Nome
          </th>
          <th scope="col" style={{ width: "20%" }}>
            Produtos na categorias
          </th>
          <th scope="col" style={{ width: "10%" }}>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.idcatg}>
            <td>
              <span className="mb-0 text-sm">{category.nome}</span>
            </td>
            <td>{category.produtos}</td>
            <td>
              <Button
                size="sm"
                onClick={() => {
                  setItem(category);
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
                  setDeleteItemId(category.idcatg);
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
