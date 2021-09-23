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
import { ModalCreateFuncionario } from "components/pages/Funcionarios/ModalCreateFuncionario";
import { TableFuncionario } from "components/pages/Funcionarios/TableFuncionario";
import { ModalUpdateFuncionario } from "components/pages/Funcionarios/ModalUpdateFuncionario";

function Funcionarios() {
    const { setModalOpen } = usePageModal();
    const { setDeleteModalOpen } = usePageDeleteModal();

    const [Funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await api.get("/funcionario");

        setFuncionarios(response.data);
    }

    async function handleDeleteItem(id) {
        try {
            await api.delete(`/funcionario/${id}`);

            toast.success("Funcionario removido");
            setDeleteModalOpen(false);
            getData();
        } catch (error) {
            toast.error("Erro ao apagar funcionario");
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
                                <h3 className="mb-0">Lista de Funcionario</h3>
                                <Button color="success" onClick={() => setModalOpen(true)}>
                                    Adicionar nova funcionario
                                </Button>
                            </CardHeader>
                            {Funcionarios.length === 0 ? (
                                <p className="text-center">Nenhum funcionario encontrado</p>
                            ) : (
                                <TableFuncionario funcionarios={Funcionarios} />
                            )}
                        </Card>
                    </div>
                </Row>
            </Container>
            <ModalCreateFuncionario updateData={getData} />
            <DeleteModal handleDelete={handleDeleteItem} />
            <ModalUpdateFuncionario updateData={getData} />
        </>
    );
}

Funcionarios.layout = Admin;

export default Funcionarios;
