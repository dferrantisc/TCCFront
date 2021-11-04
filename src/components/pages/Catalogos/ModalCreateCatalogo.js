import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import { Field, Formik } from "formik";

import { usePageModal } from "context/usePageModal";
import { api } from "services/apiClient";
import { AuthContext } from "context/AuthContext";

const initialState = {
  nome: "",
  descricao:"",
  preco: "",
  categoria: "",
};

const schema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  descricao: Yup.string().required("Campo obrigatório"),
  preco: Yup.number()
    .typeError("Informe um valor válido")
    .required("Campo obrigatório"),
  categoria: Yup.string().required("Campo obrigatório"),
  imagem: Yup.string().required("Campo obrigatório"),
});

export function ModalCreateCatalogo({ updateData }) {
  const { user } = useContext(AuthContext);

  const { isOpen, setModalOpen } = usePageModal();
  const [categorias, setCategorias] = useState([]);

  useEffect(async () => {
    const response = await api.get("/categoria");
    setCategorias(response.data);
  }, []);

  async function handleCreate(values) {
    try {
      const data = new FormData();
      data.append("imagem", values.imagem);
      data.append("nome", values.nome);
      data.append("descricao", values.descricao);
      data.append("preco", values.preco);
      data.append("idcatg", values.categoria);
      data.append("idadm", user.id);
      await api.post("/produto", data);
      updateData();
      toast.success("Produto criada com sucesso");
      setModalOpen(false);
    } catch (error) {
      toast.error("Erro ao criar produto");
    }
  }

  return (
    <>
      <Modal toggle={() => setModalOpen(!isOpen)} isOpen={isOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Adicionar produto
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
                  {errors.descricao && <FormFeedback>{errors.descricao}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                  <Label>Categoria</Label>
                  <Input
                    type="select"
                    name="categoria"
                    value={values.categoria}
                    onChange={handleChange}
                    invalid={!!errors.categoria}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.idcatg} value={categoria.idcatg}>
                        {categoria.nome}
                      </option>
                    ))}
                  </Input>
                  {errors.categoria && (
                    <FormFeedback>{errors.categoria}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Preço</Label>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>R$</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      tag={Field}
                      name="preco"
                      type="text"
                      invalid={errors.preco && touched.preco}
                    />
                    {errors.preco && (
                      <FormFeedback>{errors.preco}</FormFeedback>
                    )}
                  </InputGroup>
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
