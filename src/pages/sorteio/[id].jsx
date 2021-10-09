import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { setupAPIClient } from "services/api";
import { SERVER_IP } from "config";

export default function Sorteio({ sorteio }) {
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(nome, telefone, dataNascimento, cpf, email);

    const api = setupAPIClient();

    try {
      const response = await api.post("/cliente", {
        nome,
        telefone,
        data_nascimento: dataNascimento,
        cpf,
        email,
      });

      const { iduc } = response.data;

      const sorteioResponse = await api.post("/sorteio/cliente", {
        id_sorteio: sorteio.id,
        id_cliente: iduc,
      });

      toast.success("Cadastro realizado com sucesso");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center ">
              <h2 className="heading-section mt-6">{sorteio.nome}</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-6 d-flex align-items-stretch">
                    <div className="contact-wrap w-100 p-md-5 p-4 py-5">
                      <h3 className="mb-4">
                        Insira seus Dados para Participar e Ganhar Prêmios!
                      </h3>
                      <div id="form-message-warning" className="mb-4"></div>
                      {/* <div id="form-message-success" className="mb-4">
                        Participação do Sorteio Concluída, Obrigado(a) e Boa
                        Sorte!
                      </div> */}
                      <form
                        method="POST"
                        id="contactForm"
                        name="contactForm"
                        className="contactForm"
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                require
                                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                className="form-control cpf-mask"
                                cpf-mask="000.000.000-00"
                                name="cpf"
                                id="cpf"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="telefone"
                                id="telefone"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="date"
                                className="form-control date-mask"
                                date-mask="dd/mm/aaaa"
                                name="datanascimento"
                                id="datanascimento"
                                require
                                partter="[0-9]{2}-[0-9]{02}-[0-9]{4}"
                                value={dataNascimento}
                                onChange={(e) =>
                                  setDataNascimento(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="submit"
                                value="Enviar"
                                className="btn btn-primary"
                              />
                              <div className="submitting"></div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-stretch">
                    <div className="info-wrap w-100 p-md-5 p-4 py-5 img">
                      <h3>Foto oficial do Sorteio</h3>
                      <p className="mb-4">{sorteio.descricao}</p>
                      <img
                        width="350px"
                        src={`${SERVER_IP}/images/${sorteio.imagem}`}
                        alt="teste"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const api = setupAPIClient(ctx);

  try {
    const response = await api.get(`/sorteio/${id}`);

    const { idsort, nome, descricao, imagem, datainicio, datafim } =
      response.data;

    return {
      props: {
        sorteio: {
          id: idsort,
          nome,
          descricao,
          imagem,
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
