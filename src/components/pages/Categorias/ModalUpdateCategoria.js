import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";

import { api } from "services/apiClient";
import { usePageUpdateModal } from "context/usePageUpdateModal";
import { Field, Formik } from "formik";

const schema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
});

export function ModalUpdateCategoria({ updateData }) {
  const { isOpenUpdateModal, setUpdateModalOpen, item, setItem } =
    usePageUpdateModal();

  async function handleUpdate(values) {
    try {
      await api.put(`/categoria/${item.idcatg}`, {
        ...values,
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
        <Formik
          initialValues={item}
          validationSchema={schema}
          onSubmit={handleUpdate}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <FormGroup>
                  <Label>Nome</Label>
                  <Input
                    tag={Field}
                    type="text"
                    name="nome"
                    invalid={errors.nome && touched.nome}
                  />
                  {errors.nome && <FormFeedback>{errors.nome}</FormFeedback>}
                </FormGroup>
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
          )}
        </Formik>
      </Modal>
    </>
  );
}
