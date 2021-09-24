import { Button, Table, UncontrolledTooltip } from "reactstrap";
import Link from "next/link";

import { usePageDeleteModal } from "context/usePageDeleteModal";
import { usePageUpdateModal } from "context/usePageUpdateModal";
import { SERVER_IP } from "config";

export function TableParticipantesSorteio({ participantes }) {
  const { setDeleteModalOpen, setDeleteItemId } = usePageDeleteModal();

  return (
    <div style={{ maxHeight: "400px", overflow: "auto" }}>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col" style={{ width: "30%" }}>
              Nome
            </th>
            <th scope="col" style={{ width: "30%" }}>
              E-mail
            </th>
            <th scope="col" style={{ width: "30%" }}>
              Telefone
            </th>
            <th scope="col" style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="mb-0 text-sm">Teste 1</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test1@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test1@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">Test 2</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test2@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test3@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <td>
              <span className="mb-0 text-sm">test4</span>
            </td>
            <td>
              <span className="mb-0 text-sm">test4@gmail.com</span>
            </td>
            <td>
              <span className="(67) 9 9999-9999">test4@gmail.com</span>
            </td>

            <td>
              <Button
                size="sm"
                //   onClick={() => {
                //     setDeleteItemId(sorteio.idsort);
                //     setDeleteModalOpen(true);
                //   }}
                id="removeButton"
              >
                <i className="fas fa-trash text-danger"></i>
              </Button>
              <UncontrolledTooltip placement="bottom" target="removeButton">
                Remover
              </UncontrolledTooltip>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
