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

export function ModalUpdateFuncionario({ updateData }) {
  const { isOpenUpdateModal, setUpdateModalOpen, item, setItem } =
    usePageUpdateModal();

  async function handleUpdate(values) {
    try {
      await api.put(`/funcionario/${item.idadm}`, {
        ...values,
      });
      updateData();
      toast.success("Funcionario atualizado com sucesso");
      setUpdateModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar Funcionario");
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
            Funcionario
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
                  <Label>Login</Label>
                  <Input
                    tag={Field}
                    type="text"
                    name="login"
                    invalid={errors.login && touched.login}
                  />
                  {errors.login && <FormFeedback>{errors.login}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                  <Label>Senha</Label>
                  <Input
                    tag={Field}
                    type="password"
                    name="senha"
                    invalid={errors.senha && touched.senha}
                  />
                  {errors.senha && <FormFeedback>{errors.senha}</FormFeedback>}
                </FormGroup>
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
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    tag={Field}
                    type="text"
                    name="email"
                    invalid={errors.email && touched.email}
                  />
                  {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
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
