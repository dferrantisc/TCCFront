import React, { useEffect, useState } from "react";

import { Card, CardHeader, Container, Row, Button, CardBody } from "reactstrap";

import Admin from "layouts/Admin.js";
import CleanHeader from "components/Headers/CleanHeader";
import { usePageModal } from "context/usePageModal";
import axios from "axios";
import { SERVER_IP } from "config";
import { TableParticipantesSorteio } from "components/pages/Sorteio/TableParticipantesSorteio";
import { api } from "services/apiClient";
import { TableGanhadoresSorteio } from "components/pages/Sorteio/TableGanhadoresSorteio";

function Sorteios({ sorteio }) {
  const { setModalOpen } = usePageModal();
  const [participantes, setParticipantes] = useState([]);
  const [ganhadores, setGanhadores] = useState([]);

  useEffect(() => {
    async function getGanhadores() {
      const response = await api.get(`/sorteio/${sorteio.idsort}/ganhadores`);
      setGanhadores(response.data);
    }
    async function getData() {
      const response = await api.get(`/sorteio/${sorteio.idsort}/cliente`);
      setParticipantes(response.data);
    }

    getGanhadores();
    getData();
  }, []);

  async function realizarSorteio() {
    const response = await api.post(`/sorteio/${sorteio.idsort}/ganhadores`);
    setGanhadores(response.data);
  }

  return (
    <>
      <CleanHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <div>
                  <h2 className="mb-0"> {sorteio.nome} </h2>
                  <p className="mb-0"> {sorteio.descricao} </p>
                </div>
                {ganhadores.length < 1 && (
                  <Button color="success" onClick={realizarSorteio}>
                    Realizar sorteio
                  </Button>
                )}
              </CardHeader>
              <CardBody>
                <div className="d-flex">
                  <img
                    src={`${SERVER_IP}/images/${sorteio.imagem}`}
                    width="350"
                    height="350"
                  />
                  <div style={{ flex: 1 }} className="px-4">
                    <p className="font-weight-bold text-center">
                      Participantes
                    </p>
                    <TableParticipantesSorteio participantes={participantes} />
                  </div>
                </div>
                <div>
                  <h2 className="mt-4">Ganhadores</h2>
                  <TableGanhadoresSorteio ganhadores={ganhadores} />
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
