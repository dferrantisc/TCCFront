import React, { useEffect, useState } from "react";

import { Card, CardHeader, Container, Row, Button } from "reactstrap";
import { toast } from "react-toastify";

import Admin from "layouts/Admin.js";
import CleanHeader from "components/Headers/CleanHeader";
import { ModalCreateCategoria } from "components/pages/Categorias/ModalCreateCategoria";
import { usePageModal } from "context/usePageModal";
import { api } from "services/apiClient";
import { usePageDeleteModal } from "context/usePageDeleteModal";
import { DeleteModal } from "components/Common/DeleteModal";
import { ModalUpdateCategoria } from "components/pages/Categorias/ModalUpdateCategoria";
import { TableCategories } from "components/pages/Categorias/TableCategories";

function Categorias() {
  const { setModalOpen } = usePageModal();
  const { setDeleteModalOpen } = usePageDeleteModal();

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
      <Container className="mt--7" fluid>
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
                <TableCategories categories={categories} />
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

Categorias.layout = Admin;

export default Categorias;
