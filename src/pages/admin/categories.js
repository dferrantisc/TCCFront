import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CleanHeader from "components/Headers/CleanHeader";
import {
  ModalCategoria,
  ModalCreateCategoria,
} from "components/pages/Categories/ModalCreateCategoria";
import { usePageModal } from "context/usePageModal";
import { api } from "services/apiClient";
import { usePageDeleteModal } from "context/usePageDeleteModal";
import { DeleteModal } from "components/Common/DeleteModal";
import { ModalUpdateCategoria } from "components/pages/Categories/ModalUpdateCategoria";
import { usePageUpdateModal } from "context/usePageUpdateModal";

function Tables() {
  const { setModalOpen } = usePageModal();
  const { setDeleteModalOpen, deleteItemId, setDeleteItemId } =
    usePageDeleteModal();

  const { setUpdateModalOpen, setItem } = usePageUpdateModal();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await api.get("/categoria");

    setCategories(response.data);
  }

  async function handleDeleteItem(id) {
    try {
      await api.delete(`/categoria/${id}`);

      toast.success("Categoria removida");
      setDeleteModalOpen(false);
      getData();
    } catch (error) {
      toast.error("Erro ao apagar categoria");
    }
  }

  return (
    <>
      <CleanHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Lista de categorias</h3>
                <Button color="success" onClick={() => setModalOpen(true)}>
                  Adicionar nova categoria
                </Button>
              </CardHeader>
              {categories.length === 0 ? (
                <p className="text-center">Nenhuma categoria encontrada</p>
              ) : (
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
                      <tr>
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
                          >
                            <i className="fas fa-edit text-info"></i>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setDeleteItemId(category.idcatg);
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
              )}
            </Card>
          </div>
        </Row>
      </Container>
      <ModalCreateCategoria updateData={getData} />
      <DeleteModal handleDelete={handleDeleteItem} />
      <ModalUpdateCategoria updateData={getData} />
    </>
  );
}

Tables.layout = Admin;

export default Tables;
