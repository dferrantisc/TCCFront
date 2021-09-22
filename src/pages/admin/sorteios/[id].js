import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  CardBody,
  Table,
} from "reactstrap";
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
import axios from "axios";
import { SERVER_IP } from "config";
import { TableParticipantesSorteio } from "components/pages/Sorteio/TableParticipantesSorteio";

function Sorteios({ sorteio }) {
  const { setModalOpen } = usePageModal();
  const { setDeleteModalOpen } = usePageDeleteModal();

  const [sorteios, setSorteios] = useState([]);

  useEffect(() => {
    console.log(sorteio);
  }, []);

  return (
    <>
      <CleanHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <div>
                  <h2 className="mb-0">{sorteio.nome}</h2>
                  <p className="mb-0">{sorteio.descricao}</p>
                </div>
                <Button color="success" onClick={() => setModalOpen(true)}>
                  Realizar sorteio
                </Button>
              </CardHeader>
              <CardBody className="d-flex">
                <img
                  src={`${SERVER_IP}/images/${sorteio.imagem}`}
                  width="350"
                  height="350"
                />
                <div style={{ flex: 1 }} className="px-4">
                  <p className="font-weight-bold text-center">Participantes</p>
                  <TableParticipantesSorteio />
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Sorteios.layout = Admin;

export default Sorteios;

export const getServerSideProps = async ({ req, params }) => {
  const { id } = params;

  const response = await axios.get(`${SERVER_IP}/sorteio/${id}`);

  return {
    props: { sorteio: response.data },
  };
};
