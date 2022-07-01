import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import useModal from '../../components/modal/useModal';
import "../../assets/css/home.css"
import caixa from '../../assets/img/caixa.png'
import bradesco from '../../assets/img/bradesco.png'
import santander from '../../assets/img/santander.png'
import itau from '../../assets/img/itau.png'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {
  const { isShowing, toggle } = useModal();
  const [tipoImovel, setTipoImovel] = useState('');
  const [valorImovel, setValorImovel] = useState();
  const [rendaMensal, setRendaMensal] = useState('');
  const [dataNascimento, setDataNascimento] = useState();
  const [listaCreditos, setListaCreditos] = useState([]);
  const [entrada, setEntrada] = useState();
  const [finaciamento, setFinaciamento] = useState();
  const [prazo, setPrazo] = useState();
  const [sucesso, setSucesso] = useState(false)

  function buscarCreditos() {
    axios('http://localhost:5000/api/Credito')
      .then(resposta => {
        if (resposta.status === 200) {
          // console.log(resposta.data)
          setListaCreditos(resposta.data)
          setSucesso(true)
          setValorImovel(finaciamento)
        };
      })
      .catch(erro => console.log(erro));
  };

  const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal_sobreposicao" />
      <div className="modal_alinhamento" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal_conteudo">
            <button type="button" className="fechar_modal" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className='formulario_modal'>
            <input type="text"
              placeholder='Tipo de imóvel'
              value={tipoImovel}
              onChange={(campo) => setTipoImovel(campo.target.value)}
              className="input_modal" />

            <input type="number"
              placeholder='Valor do imóvel'
              value={valorImovel}
              onChange={(campo) => setValorImovel(campo.target.value)}
              className="input_modal" />

            <input type="number"
              placeholder='Renda mensal'
              value={rendaMensal}
              onChange={(campo) => setRendaMensal(campo.target.value)}
              className="input_modal" />

            <input type="date"
              placeholder='Data de nascimento do partcipante mais velho'
              value={dataNascimento}
              onChange={(campo) => setDataNascimento(campo.target.value)}
              className="input_modal" />

          </div>
          <button className='btn_salvar' onClick={hide}>Salvar</button>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;

  return (
    <div>
      <Header></Header>

      <main>
        <section className='container_resultados'>
          <p className='subtitulo_secao'>Simulação pronta!</p>
          <h1>Escolha a opção de sua preferência para solicitar aprovação de crédito.</h1>

          <div className='alinhamento_secao'>
            <div>
              <div className='dados_finaciamento'>
                <div className='alinhamento'>
                  <h2>Dados de finaciamento</h2>
                  <p className='subtitulo_finaciamento'>Mexa na régua para ajustar os valores</p>

                  <input type="date"
                    placeholder='Prazo do finaciamento'
                    value={prazo}
                    onChange={(campo) => setPrazo(campo.target.value)}
                    className="input_secao" />

                  <input type="text"
                    placeholder='Valor do finacimento'
                    value={finaciamento}
                    onChange={(campo) => setFinaciamento(campo.target.value)}
                    className="input_secao" />

                  <input type="text"
                    placeholder='Valor da entrada + FGTS'
                    value={entrada}
                    onChange={(campo) => setEntrada(campo.target.value)}
                    className="input_secao" />

                  <button className="btn" onClick={buscarCreditos}>Realizar Simulação</button>
                </div>
              </div>

              <div className='dados_simulacao'>
                <h2>Dados de simulação</h2>
                <div className='alinhamento_simulacao'>
                  <p className='simulacao_texto'>Tipo de imóvel</p>
                  <p className='simulacao_texto'>{tipoImovel}</p>
                  <p className='simulacao_texto'>Valor do imóvel</p>
                  <p className='simulacao_texto'>R$ {valorImovel}</p>
                  <p className='simulacao_texto'>Renda mensal</p>
                  <p className='simulacao_texto'>{rendaMensal}</p>
                  <p className='simulacao_texto'>Data de nascimento</p>
                  <p className='simulacao_texto'>{dataNascimento}</p>
                  <button className="btn" onClick={toggle}>Veja Mais</button>
                  <Modal
                    isShowing={isShowing}
                    hide={toggle}
                  />
                </div>
              </div>
            </div>

            {sucesso === true &&
              <div class="tabela">
                <table border="1">
                  <tr>
                    <th><h2>Temos algumas opções para você escolher o caminho certo para financiar seu imóvel.</h2></th>
                    {
                      listaCreditos.map((creditos) => {
                        return (
                          <th>
                            <div className='alinhamento_creditos'>
                              <div>
                                <div key={creditos.idCredito}>
                                  <p>{creditos.nomeCredito}</p>
                                </div>
                              </div>
                              <button className='btn_tabela'>Solicitar crédito</button>
                            </div>
                          </th>
                        )
                      })
                    }
                  </tr>
                  <tr className='fundo_cinza'>
                    <td className='tabela_fixos'>Taxa de juros</td>
                    {
                      listaCreditos.map((creditos) => {
                        return (
                          <td className='tabela_valores'>{creditos.taxas}%</td>
                        )
                      })
                    }
                  </tr>
                  <tr>
                    <td className='tabela_fixos'>CET</td>
                    <td className='tabela_valores'>1111-1111</td>
                    <td className='tabela_valores'>2222-2222</td>
                    <td className='tabela_valores'>2222-2222</td>
                    <td className='tabela_valores'>2222-2222</td>
                  </tr>
                  <tr className='fundo_cinza'>
                    <td className='tabela_fixos'>Parcela</td>
                    <td className='tabela_valores'>R$</td>
                    <td className='tabela_valores'>R$</td>
                    <td className='tabela_valores'>R$</td>
                    <td className='tabela_valores'>R$</td>
                  </tr>
                  <tr>
                    <td className='tabela_fixos'>Tarifa de avaliação do imóvel</td>
                    {
                      listaCreditos.map((creditos) => {
                        return (
                          <td className='tabela_valores'>R${creditos.tarifaAvalicao},00</td>
                        )
                      })
                    }
                  </tr>
                  <tr className='fundo_cinza'>
                    <td className='tabela_fixos'>Finaciamento das taxas e impostos</td>
                    <td className='tabela_valores'>1111-1111</td>
                    <td className='tabela_valores'>2222-2222</td>
                    <td className='tabela_valores'>2222-2222</td>
                    <td className='tabela_valores'>2222-2222</td>
                  </tr>
                  <tr >
                    <td className='tabela_fixos'>Finaciamento das taxas e impostos</td>
                    <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                    <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                    <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                    <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                  </tr>
                </table>
              </div>
            }
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div >
  );
}

export default App;
