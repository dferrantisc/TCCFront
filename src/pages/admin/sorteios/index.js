import React, { useEffect, useState } from "react";

import { Card, CardHeader, Container, Row, Button } from "reactstrap";
import { toast } from "react-toastify";

import Admin from "layouts/Admin.js";
import CleanHeader from "components/Headers/CleanHeader";
import { usePageModal } from "context/usePageModal";
import { api } from "services/apiClient";
import { usePageDeleteModal } from "context/usePageDeleteModal";
import { DeleteModal } from "components/Common/DeleteModal";
import { TableCatalogos } from "components/pages/Catalogos/TableCatalogos";
import { ModalCreateSorteio } from "components/pages/Sorteio/ModalCreateSorteio";
import { ModalUpdateSorteio } from "components/pages/Sorteio/ModalUpdateSorteio";
import { TableSorteios } from "components/pages/Sorteio/TableSorteios";

function Sorteios() {
  const { setModalOpen } = usePageModal();
  const { setDeleteModalOpen } = usePageDeleteModal();

  const [sorteios, setSorteios] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await api.get("/sorteio");

    setSorteios(response.data);
  }

  async function handleDeleteItem(id) {
    try {
      await api.delete(`/sorteio/${id}`);

      toast.success("Sorteio removido");
      setDeleteModalOpen(false);
      getData();
    } catch (error) {
      toast.error("Erro ao apagar sorteio");
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
                <h3 className="mb-0">Lista de sorteios</h3>
                <Button color="success" onClick={() => setModalOpen(true)}>
                  Novo sorteio
                </Button>
              </CardHeader>
              {sorteios.length === 0 ? (
                <p className="text-center">Nenhuma sorteio encontrado</p>
              ) : (
                <TableSorteios sorteios={sorteios} />
              )}
            </Card>
          </div>
        </Row>
      </Container>
      <ModalCreateSorteio updateData={getData} />
      <DeleteModal handleDelete={handleDeleteItem} />
      <ModalUpdateSorteio updateData={getData} />
    </>
  );
}

Sorteios.layout = Admin;

export default Sorteios;
