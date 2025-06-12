import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento";
import TipoEvento from "../pages/tipoEvento/TipoEvento";
import TipoUsuario from "../pages/tipoUsuario/TipoUsuario";
import ListagemEventos from "../pages/listagemEventos/ListagemEventos";
import { useauth } from "../context/Auth.Context";


const Privado = (props) => {
    const {usuario} = useauth();
    //toke, idusuario, tipousuario

    //se nao estiver autenticado, manda para login 
    if (!usuario){
        return<Navigate to="/" />
    }
    if (usuario.TipoUsuario !== props.tipoPermitido){
        return <Navigate to="/" />
    };

};

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} exact />
                <Route path="/Cadastro" element={<CadastroEvento/>} exact />
                <Route path="/TipoEvento" element={<TipoEvento/>} exact />
                <Route path="/TipoUsuario" element={<TipoUsuario/>} exact />
                <Route path="/ListagemEvento" element={<ListagemEventos/>}exact/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;