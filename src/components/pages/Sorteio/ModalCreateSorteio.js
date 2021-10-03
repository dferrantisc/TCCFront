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

const initialValues = {
  nome: "",
  descricao: "",
  quantidade_ganhadores: 1,
  imagem: "",
};

const schema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  descricao: Yup.string().required("Campo obrigatório"),
  quantidade_ganhadores: Yup.number()
    .typeError("Informe um valor válido")
    .required("Campo obrigatório"),
  imagem: Yup.string().required("Campo obrigatório"),
  dataInicio: Yup.string().required("Campo obrigatório"),
  dataFim: Yup.string().required("Campo obrigatório"),
});

export function ModalCreateSorteio({ updateData }) {
  const { isOpen, setModalOpen } = usePageModal();

  async function handleCreate(values) {
    try {
      console.log(values);
      const data = new FormData();
      data.append("imagem", values.imagem);
      data.append("nome", values.nome);
      data.append("descricao", values.descricao);
      data.append("quantidade_ganhadores", values.quantidade_ganhadores);
      data.append("datainicio", values.dataInicio);
      data.append("datafim", values.dataFim);
      await api.post("/sorteio", data);
      updateData();
      toast.success("Sorteio criada com sucesso");
      setModalOpen(false);
    } catch (error) {
      toast.error("Erro ao criar sorteio");
    }
  }

  return (
    <>
      <Modal toggle={() => setModalOpen(!isOpen)} isOpen={isOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Adicionar sorteio
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
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleCreate}
        >
          {({
            errors,
            touched,
            handleSubmit,
            handleChange,
            values,
            setFieldValue,
          }) => (
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
                <FormGroup>
                  <Label>Descrição</Label>
                  <Input
                    tag={Field}
                    type="text"
                    name="descricao"
                    invalid={errors.descricao && touched.descricao}
                  />
                  {errors.descricao && (
                    <FormFeedback>{errors.descricao}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Quantidade de ganhadores</Label>
                  <Input
                    tag={Field}
                    name="quantidade_ganhadores"
                    type="number"
                    min="1"
                    invalid={
                      errors.quantidade_ganhadores &&
                      touched.quantidade_ganhadores
                    }
                  />
                  {errors.quantidade_ganhadores && (
                    <FormFeedback>{errors.quantidade_ganhadores}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Data de início</Label>
                  <Input
                    tag={Field}
                    type="date"
                    name="dataInicio"
                    invalid={errors.dataInicio && touched.dataInicio}
                  />
                  {errors.dataInicio && (
                    <FormFeedback>{errors.dataInicio}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Data do fim</Label>
                  <Input
                    tag={Field}
                    type="date"
                    name="dataFim"
                    invalid={errors.dataFim && touched.dataFim}
                  />
                  {errors.dataFim && (
                    <FormFeedback>{errors.dataFim}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Imagem</Label>
                  <Input
                    type="file"
                    name="imagem"
                    onChange={(event) => {
                      setFieldValue("imagem", event.currentTarget.files[0]);
                    }}
                    invalid={errors.imagem && touched.imagem}
                  />
                  {errors.imagem && (
                    <FormFeedback>{errors.imagem}</FormFeedback>
                  )}
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
