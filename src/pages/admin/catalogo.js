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
import { TableCatalogos } from "components/pages/Catalogos/TableCatalogos";
import { ModalCreateCatalogo } from "components/pages/Catalogos/ModalCreateCatalogo";
import { ModalUpdateCatalogo } from "components/pages/Catalogos/ModalUpdateCatalogo";

function Catalogo() {
  const { setModalOpen } = usePageModal();
  const { setDeleteModalOpen } = usePageDeleteModal();

  const [catalogos, setCatalogos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await api.get("/produto");

    setCatalogos(response.data);
  }

  async function handleDeleteItem(id) {
    try {
      await api.delete(`/produto/${id}`);

      toast.success("Produto removido");
      setDeleteModalOpen(false);
      getData();
    } catch (error) {
      toast.error("Erro ao apagar produto");
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
                <h3 className="mb-0">Lista de produtos</h3>
                <Button color="success" onClick={() => setModalOpen(true)}>
                  Novo produto
                </Button>
              </CardHeader>
              {catalogos.length === 0 ? (
                <p className="text-center">Nenhuma produto encontrado</p>
              ) : (
                <TableCatalogos catalogos={catalogos} />
              )}
            </Card>
          </div>
        </Row>
      </Container>
      <ModalCreateCatalogo updateData={getData} />
      <DeleteModal handleDelete={handleDeleteItem} />
      <ModalUpdateCatalogo updateData={getData} />
    </>
  );
}

Catalogo.layout = Admin;

export default Catalogo;
