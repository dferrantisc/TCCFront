import React, { useState } from "react";
import { toast } from "react-toastify";

import { Button, Form, Input, Modal, ModalBody, ModalFooter } from "reactstrap";
import { api } from "services/apiClient";
import { usePageUpdateModal } from "context/usePageUpdateModal";

export function ModalUpdateCategoria({ updateData }) {
  const { isOpenUpdateModal, setUpdateModalOpen, item, setItem } =
    usePageUpdateModal();

  function handleChange(evt) {
    const value = evt.target.value;
    setItem({
      ...item,
      [evt.target.name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/categoria/${item.idcatg}`, {
        nome: item.nome,
      });
      updateData();
      toast.success("Categoria atualizada com sucesso");
      setUpdateModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar categoria");
    }
  }

  return (
    <>
      <Modal
        toggle={() => setUpdateModalOpen(!isOpenUpdateModal)}
        isOpen={isOpenUpdateModal}
      >
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Categoria
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setUpdateModalOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              placeholder="Nome"
              type="text"
              name="nome"
              onChange={handleChange}
              value={item.nome}
              autoFocus
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={() => setUpdateModalOpen(!isOpenUpdateModal)}
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
