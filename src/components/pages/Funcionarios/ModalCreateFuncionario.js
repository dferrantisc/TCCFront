import React from "react";
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
import { Field, Formik } from "formik";

import { usePageModal } from "context/usePageModal";
import { api } from "services/apiClient";

const initialState = {
  login: "",
  senha: "",
  nome: "",
  email: "",
};

const schema = Yup.object().shape({
  login: Yup.string().required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
  nome: Yup.string().required("Campo obrigatório"),
  email: Yup.string().required("Campo obrigatório").email("E-mail Inválido"),
});

export function ModalCreateFuncionario({ updateData }) {
  const { isOpen, setModalOpen } = usePageModal();

  async function handleCreate(values) {
    console.log(values);
    try {
      await api.post("/funcionario", {
        ...values,
      });
      updateData();
      toast.success("Funcionario criado com sucesso");
      setModalOpen(false);
    } catch (error) {
      toast.error("Erro ao criar funcionario");
    }
  }

  return (
    <>
      <Modal toggle={() => setModalOpen(!isOpen)} isOpen={isOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Funcionario
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
        <Formik
          initialValues={initialState}
          validationSchema={schema}
          onSubmit={handleCreate}
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
                  <Label>senha</Label>
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
                  onClick={() => setModalOpen(!isOpen)}
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
