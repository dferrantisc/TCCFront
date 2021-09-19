import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { usePageModal } from "context/usePageModal";
import { Button, Form, Input, Modal, ModalBody, ModalFooter } from "reactstrap";
import { api } from "services/apiClient";

export function ModalCreateCategoria({ updateData }) {
  const { isOpen, setModalOpen } = usePageModal();
  const [nome, setNome] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/categoria", {
        nome,
      });
      updateData();
      toast.success("Categoria criada com sucesso");
      setModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar categoria");
    }
  }

  return (
    <>
      <Modal toggle={() => setModalOpen(!isOpen)} isOpen={isOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Categoria
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              placeholder="Nome"
              type="text"
              onChange={(e) => setNome(e.target.value)}
              autoFocus
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={() => setModalOpen(!isOpen)}
            >
              Fechar
            </Button>
            <Button color="primary" type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
