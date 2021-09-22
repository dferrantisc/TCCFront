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
import { SERVER_IP } from "config";

const initialState = {
  nome: "",
  descricao: "",
  quantidade_ganhadores: 1,
};

const schema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  descricao: Yup.string().required("Campo obrigatório"),
  quantidade_ganhadores: Yup.number()
    .typeError("Informe um valor válido")
    .required("Campo obrigatório"),
  imagem: Yup.string().required("Campo obrigatório"),
});

export function ModalUpdateSorteio({ updateData }) {
  const { isOpenUpdateModal, setUpdateModalOpen, item } = usePageUpdateModal();
  const [categorias, setCategorias] = useState([]);

  useEffect(async () => {
    const response = await api.get("/categoria");
    setCategorias(response.data);
  }, []);

  async function handleUpdate(values) {
    try {
      const data = new FormData();
      data.append("imagem", values.imagem || item.imagem);
      data.append("nome", values.nome);
      data.append("descricao", values.descricao);
      data.append("quantidade_ganhadores", values.quantidade_ganhadores);
      await api.put(`/sorteio/${item.idsort}`, data);
      updateData();
      toast.success("Sorteio atualizado com sucesso");
      setUpdateModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar sorteio");
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
            Editar sorteio
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
