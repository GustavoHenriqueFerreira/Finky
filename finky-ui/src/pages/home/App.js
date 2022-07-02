import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Select from "react-select";
import "../../assets/css/home.css"
import Cookies from 'js-cookie'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import useModal from '../../components/modal/useModal';

const optionsPrazo = [
  { value: 1, label: "1 ano" }, { value: 2, label: "2 anos" }, { value: 3, label: "3 anos" }, { value: 4, label: "4 anos" },
  { value: 5, label: "5 anos" }, { value: 6, label: "6 anos" }, { value: 7, label: "7 anos" }, { value: 8, label: "8 anos" },
  { value: 9, label: "9 anos" }, { value: 10, label: "10 anos" }, { value: 11, label: "11 anos" }, { value: 12, label: "12 anos" },
  { value: 13, label: "13 anos" }, { value: 14, label: "14 anos" }, { value: 15, label: "15 anos" }, { value: 16, label: "16 anos" },
  { value: 17, label: "17 anos" }, { value: 18, label: "18 anos" }, { value: 19, label: "19 anos" }, { value: 20, label: "20 anos" },
  { value: 21, label: "21 anos" }, { value: 22, label: "22 anos" }, { value: 23, label: "23 anos" }, { value: 24, label: "24 anos" },
  { value: 25, label: "25 anos" }, { value: 26, label: "26 anos" }, { value: 27, label: "27 anos" }, { value: 24, label: "28 anos" },
  { value: 29, label: "29 anos" }, { value: 30, label: "30 anos" }, { value: 31, label: "31 anos" }, { value: 32, label: "32 anos" },
  { value: 33, label: "33 anos" }, { value: 34, label: "34 anos" }, { value: 35, label: "35 anos" }
];

const optionsFinanciamento = [
  { value: 150, label: "R$ 150.000,00" }, { value: 170, label: "R$ 170.000,00" },
  { value: 200, label: "R$ 200.000,00" }, { value: 220, label: "R$ 220.000,00" }, { value: 250, label: "R$ 250.000,00" }, { value: 270, label: "R$ 270.000,00" },
  { value: 300, label: "R$ 300.000,00" }, { value: 320, label: "R$ 320.000,00" }, { value: 350, label: "R$ 350.000,00" }, { value: 370, label: "R$ 370.000,00" },
  { value: 400, label: "R$ 400.000,00" }, { value: 420, label: "R$ 420.000,00" }, { value: 450, label: "R$ 450.000,00" }, { value: 470, label: "R$ 470.000,00" },
  { value: 500, label: "R$ 500.000,00" }, { value: 520, label: "R$ 520.000,00" }, { value: 550, label: "R$ 550.000,00" }, { value: 570, label: "R$ 570.000,00" },
  { value: 600, label: "R$ 600.000,00" }, { value: 620, label: "R$ 620.000,00" }, { value: 650, label: "R$ 650.000,00" }, { value: 670, label: "R$ 670.000,00" },
  { value: 700, label: "R$ 700.000,00" }, { value: 720, label: "R$ 720.000,00" }, { value: 750, label: "R$ 750.000,00" }, { value: 770, label: "R$ 770.000,00" },
  { value: 800, label: "R$ 800.000,00" }, { value: 820, label: "R$ 820.000,00" }, { value: 850, label: "R$ 850.000,00" }, { value: 870, label: "R$ 870.000,00" },
  { value: 900, label: "R$ 900.000,00" }, { value: 950, label: "R$ 950.000,00" }, { value: 1000, label: "R$ 1000.000,00" }
];

const optionsEntrada = [
  { value: 50, label: "R$ 50.000,00" }, { value: 75, label: "R$ 75.000,00" }, { value: 100, label: "R$ 100.000,00" },
  { value: 125, label: "R$ 125.000,00" }, { value: 150, label: "R$ 150.000,00" }, { value: 175, label: "R$ 175.000,00" },
  { value: 200, label: "R$ 200.000,00" }, { value: 250, label: "R$ 250.000,00" }, { value: 300, label: "R$ 300.000,00" }
];

function App() {
  const { isShowing, toggle } = useModal();
  const [tipoImovel, setTipoImovel] = useState('');
  const [valorImovel, setValorImovel] = useState('');
  const [rendaMensal, setRendaMensal] = useState('');
  const [dataNascimento, setDataNascimento] = useState('11/11/1970');
  const [listaCreditos, setListaCreditos] = useState([]);
  const [entrada, setEntrada] = useState([]);
  const [financiamento, setFinanciamento] = useState(700);
  const [prazo, setPrazo] = useState(25);
  const [parcela, setParcela] = useState();

  const setCookieFunction = () => {
    const data = [{ tipoImovel: tipoImovel, valorImovel: valorImovel, rendaMensal: rendaMensal, dataNascimento: dataNascimento, salvo: true }]
    document.cookie = "data=" + JSON.stringify(data)
    /* localStorage.setItem('tipoImovel', tipoImovel)
    localStorage.setItem('valorImovel', valorImovel)
    localStorage.setItem('rendaMensal', rendaMensal)
    localStorage.setItem('dataNascimento', dataNascimento) */

    console.log('Informações salvas!')
  }

  const atualizarDados = () => {
    const resultado = document.cookie;
    console.log(resultado)
    //Não finalizado, guardaria no cookie e verificaria se já foi utilizado e setaria os valores com os guardados anteriormente
    //console.log(JSON.parse(dados))
  }

  useEffect(atualizarDados, []);

  function buscarCreditos() {
    axios('http://localhost:5000/api/Credito')
      .then(resposta => {
        if (resposta.status === 200) {
          // console.log(resposta.data)
          setListaCreditos(resposta.data);
        };
      })
      .catch(erro => console.log(erro));
  };

  function calcularParcelas() {
    const meses = prazo * 12;
    const amortizacao = financiamento / meses;
    const jurosMensal = ((1 + 9) ^ (1 / 12) - 1);
    const juros = financiamento * jurosMensal;
    const valorSeguro = (amortizacao + juros) * 0.3;
    setParcela(valorSeguro + amortizacao + juros);
    /* console.log(prazo) */
  };

  useEffect(() => {
    calcularParcelas();
  }, []);

  const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment autoFocus={false}>
      <div className="modal_sobreposicao" />
      <div className="modal_alinhamento" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal_conteudo">
            <button type="button" className="fechar_modal" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className='formulario_modal'>
            <h3 className='titulo_modal'>Edite Seus Dados</h3>
            <label>Tipo de imóvel</label>
            <input type="text"
              placeholder='Residencial ou Condomínio'
              value={tipoImovel}
              onChange={(campo) => setTipoImovel(campo.target.value)}
              className="input_modal" />

            <label>Valor do Imóvel</label>
            <input type="text"
              placeholder='R$100.000,00'
              value={valorImovel}
              onChange={(campo) => setValorImovel(campo.target.value)}
              className="input_modal" />

            <label>Renda Mensal</label>
            <input type="text"
              placeholder='R$4.000,00'
              value={rendaMensal}
              onChange={(campo) => setRendaMensal(campo.target.value)}
              className="input_modal" />

            <label>Data de Nascimento do participante mais velho</label>
            <input type="date"
              placeholder='Data de nascimento do partcipante mais velho'
              value={dataNascimento}
              onChange={(campo) => setDataNascimento(campo.target.value)}
              className="input_modal" />
          </div>

          {tipoImovel !== '' && valorImovel !== '' && rendaMensal !== '' && dataNascimento !== '' &&
            <button className='btn_salvar' onClick={() => { buscarCreditos(); calcularParcelas(); setCookieFunction(); }}>Salvar</button>
          }

          {tipoImovel === '' && valorImovel === '' && rendaMensal === '' && dataNascimento === null &&
            <button className='btn_salvar' disabled>Salvar</button>
          }
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
              <div className='dados_financiamento'>
                <div className='alinhamento'>
                  <h2>Dados de financiamento</h2>
                  <p className='subtitulo_financiamento'>Mexa na régua para ajustar os valores</p>

                  <Select
                    placeholder='Prazo de financiamento'
                    name="Prazo"
                    className="input_secao"
                    value={prazo.value}
                    onChange={(value) => setPrazo(value.value)}
                    onInputChange={calcularParcelas}
                    options={optionsPrazo}
                  />

                  <Select
                    placeholder="Valor do financiamento"
                    name="Financiamento"
                    className="input_secao"
                    value={financiamento.value}
                    onChange={(value) => setFinanciamento(value.value)}
                    onInputChange={calcularParcelas}
                    options={optionsFinanciamento}
                  />

                  <Select
                    placeholder="Valor da entrada + FGTS"
                    name="Entrada"
                    className="input_secao"
                    value={entrada.value}
                    onChange={(value) => setEntrada(value.value)}
                    options={optionsEntrada}
                  />
                </div>
              </div>

              <div className='dados_simulacao'>
                <h2>Dados de simulação</h2>
                <div className='alinhamento_simulacao'>
                  <p className='simulacao_texto'>Tipo de imóvel:</p>
                  <p className='simulacao_texto'>{tipoImovel}</p>
                  <p className='simulacao_texto'>Valor do imóvel:</p>
                  <p className='simulacao_texto'>{valorImovel}</p>
                  <p className='simulacao_texto'>Renda mensal:</p>
                  <p className='simulacao_texto'>{rendaMensal}</p>
                  <p className='simulacao_texto'>Data de nascimento:</p>
                  <p className='simulacao_texto'>{dataNascimento}</p>
                  <button className="btn" onClick={toggle}>Editar Dados</button>
                  <Modal
                    isShowing={isShowing}
                    hide={toggle}
                  />
                </div>
              </div>
            </div>

            <div class="tabela">
              <table border="1">
                <tr>
                  <th><h2>Temos algumas opções para você escolher o caminho certo para financiar seu imóvel.</h2></th>
                  {
                    listaCreditos.map((creditos) => {
                      return (
                        <th key={creditos.idCredito}>
                          <div className='alinhamento_creditos'>
                            <div>
                              <div>
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
                        <td key={creditos.idCredito} className='tabela_valores'>{creditos.taxas}%</td>
                      )
                    })
                  }
                </tr>
                <tr>
                  <td className='tabela_fixos'>CET</td>
                  <td className='tabela_valores'>2,11%</td>
                  <td className='tabela_valores'>2,11%</td>
                  <td className='tabela_valores'>2,11%</td>
                  <td className='tabela_valores'>2,11%</td>
                </tr>
                <tr className='fundo_cinza'>
                  <td className='tabela_fixos'>Parcela</td>
                  <td className='tabela_valores'>R${parseFloat(parcela).toFixed(2)}</td>
                  <td className='tabela_valores'>R${parseFloat(parcela).toFixed(2)}</td>
                  <td className='tabela_valores'>R${parseFloat(parcela).toFixed(2)}</td>
                  <td className='tabela_valores'>R${parseFloat(parcela).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='tabela_fixos'>Tarifa de avaliação do imóvel</td>
                  {
                    listaCreditos.map((creditos) => {
                      return (
                        <td key={creditos.idCredito} className='tabela_valores'>R${creditos.tarifaAvalicao},00</td>
                      )
                    })
                  }
                </tr>
                <tr className='fundo_cinza'>
                  <td className='tabela_fixos'>Financiamento das taxas e impostos</td>
                  <td className='tabela_valores'>5% do valor do imóvel</td>
                  <td className='tabela_valores'>5% do valor do imóvel</td>
                  <td className='tabela_valores'>5% do valor do imóvel</td>
                  <td className='tabela_valores'>5% do valor do imóvel</td>
                </tr>
                <tr >
                  <td className='tabela_fixos'>Financiamento das taxas e impostos</td>
                  <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                  <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                  <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                  <td className='tabela_valores'>Conta corrente, cartão de crédito, previdência</td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div >
  );
}

export default App;