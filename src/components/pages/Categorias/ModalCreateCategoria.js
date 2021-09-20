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
  nome: "",
};

const schema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
});

export function ModalCreateCategoria({ updateData }) {
  const { isOpen, setModalOpen } = usePageModal();

  async function handleCreate(values) {
    console.log(values);
    try {
      await api.post("/categoria", {
        ...values,
      });
      updateData();
      toast.success("Categoria criada com sucesso");
      setModalOpen(false);
    } catch (error) {
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
        <Formik
          initialValues={initialState}
          validationSchema={schema}
          onSubmit={handleCreate}
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
