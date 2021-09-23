import { AuthContext } from "context/AuthContext";
import { usePageDeleteModal } from "context/usePageDeleteModal";
import { usePageUpdateModal } from "context/usePageUpdateModal";
import { useContext } from "react";
import { Button, Table, UncontrolledTooltip } from "reactstrap";

export function TableFuncionario({ funcionarios }) {
  const {user} = useContext(AuthContext);
  const { setUpdateModalOpen, setItem } = usePageUpdateModal();
  const { setDeleteModalOpen, setDeleteItemId } = usePageDeleteModal();

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col" style={{ width: "40%" }}>
            Nome
          </th>
          <th scope="col" style={{ width: "30%" }}>
            E-mail
          </th>
          <th scope="col" style={{ width: "20%" }}>
            Login
          </th>
          <th scope="col" style={{ width: "10%" }}>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {funcionarios.map((funcionario) => (
        <tr key={funcionario.idcatg}>
          <td>
            <span className="mb-0 text-sm">{funcionario.nome}</span>
          </td>
          <td>
            <span className="mb-0 text-sm">{funcionario.email}</span>
          </td>
          <td>
            <span className="mb-0 text-sm">{funcionario.login}</span>
          </td>
          
          <td>
            <Button
              size="sm"
              onClick={() => {
                setItem(funcionario);
                setUpdateModalOpen(true);
              }}
              id="infoButton"
            >
              <i className="fas fa-edit text-info"></i>
              <UncontrolledTooltip placement="bottom" target="infoButton">
                Editar
              </UncontrolledTooltip>
            </Button>
           {user.id != funcionario.idadm && <><Button
              size="sm"
              onClick={() => {
                setDeleteItemId(funcionario.idadm);
                setDeleteModalOpen(true);
              }}
              id="removeButton"
            >
              <i className="fas fa-trash text-danger"></i>
            </Button>
            <UncontrolledTooltip placement="bottom" target="removeButton">
              Remover
            </UncontrolledTooltip></>
            }
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
  );
}
