import { useEffect, useState } from "react";
import api from "../../services/Services";
import Modal from "../../components/modal/Modal.jsx"
import "./ListagemEventos.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/Comentario.svg"
import Toggle from "../../components/toggle/Toggle";
import Descricao from "../../assets/img/Descricao.svg"

const ListagemEventos = (props) => {
    const [listaEventos, setListaEventos] = useState([]);
    const [tipoModal, setTipoModel] = useState("");
    const [dadosModal, setDadosModel] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
}

    async function listarEventos() {
        try {
            const resposta = await api.get("Eventos");

            setListaEventos(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => 
        function abrirModal(tipo, dados){
         setModalAberto(true)   
         tipoModal(tipo)
         dadosModal(dados)

        })
          useEffect(() => {
        function fecharModal(tipo, dados){
         setModalAberto(false);   
         tipoModal({});
         dadosModal("");

        }

        listarEventos();
    }, [])

    return (
        <>
            <Header
                user="Aluno"
                botao_logar="none"a
            />
            <main>
                <section className="layout_grid listagem_section">
                    <div className="titulo_listagem">
                        <h1>Eventos</h1>
                        <hr />
                    </div>

                    <div className="listagem_eventos">
                        <select name="eventos">
                            <option value="" disabled selected>Todos os Eventos</option>
                            <option value="">xxxxxxxx</option>
                        </select>
                    </div>

                    <div className="list">
                        <table>
                            <tr className="list_tabela">
                                <th>Titulo</th>
                                <th>Data do Evento</th>
                                <th>Tipo Evento</th>
                                <th>Descrição</th>
                                <th>Comentários</th>
                                <th>Participar</th>
                            </tr>
                            
                            

                            <tr className="list_presenca">
                                <td>Moderação Familia Ballas</td>
                                <td>07/06/2025</td>
                                <td>Vivencia Pura</td>
                                <td>
                                    <button className="icon" onClick={() => abrirModal("descricaoEvento", 
                                        item.Descricao)}>
                                        <img src={Descricao} alt="" />
                                    </button>
                                </td>

                                    <td>
                                    <button className="icon" onClick={() => abrirModal("comentarios", 
                                        {idEvento: item.idEvento})}>
                                        <img src={Comentario} alt="" />
                                    </button>
                                </td>
                                
                                
                                <td data-cell="Presenca"><Toggle /></td>

                            </tr>
                        </table>
                    </div>
                </section>
            </main>
            <Footer visibilidade="none"
            />
            {modalAberto && (
            <Modal
             titulo = {tipoModel == "descricaoEvento" ? "Descrição do evento" : "Comentarios"}
             tipoModal = {tipoModal}
             idEvento = {dadosModal.idEvento}
             descricao = {dadosModal.descricao}
             fecharModal = {fecharModal}
             />
            )}
        </>
            
            
    )


export default ListagemEventos;