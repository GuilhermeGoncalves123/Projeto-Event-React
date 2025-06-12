import "./Login.css";
import login from "../../assets/img/login.svg";
import Botao from "../../components/botao/Botao";
import Logo from "../../assets/img/logo1.svg";

import api from "../../Services/services";
import { useState } from "react";
import Swal from "sweetalert2";
import { userDecodeToken } from "../../auth/Auth";

// biblioteca para guardar chave/valor no seu navegador
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { useauth } from "../../context/Auth.Context";

import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("")
    const navigate = useNavigate();

    async function realizarAutenticacao(e) {
        e.preventDefault();
        const usuario = { email: email, senha: senha }

        if (senha.trim() != "" || email.trim() != "") {
            try {
                const resposta = await api.post("Login", usuario);
                const token = resposta.data.token;
                // console.log(resposta.data.token);
                if (token) {
                    const tokenDecodificado = userDecodeToken(token);
                    // console.log("tokendecodificado.tipoUsuario") exibe somente o dado que voce quer

                    setUsuario(tokenDecodificado)

                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                    if (tokenDecodificado.tipoUsuario == "aluno") {
                        //encaminha para tela de eventos
                        navigate("/ListagemEvento")
                    } else {
                        //encaminha para tela de cadastro de eventos
                        navigate("/Cadastro")
                    }
                }

            } catch (error) {
               Swal.fire({
                icon: "error",
                title: "Email ou senha invalidos!",
                text:"Para duvidas entre em contato com o suporte",
                popup: 'swal-popup',
            });
            }

        } else {
            Swal.fire({
                icon: "error",
                title: "Preencha os campos para realizar o login",
                text: "Tente novamente!",
                // footer: '<a href="#">Tente novamente</a>'
            });
        }

    }
    return (
        <main className="main_login">
            <div className="banner">
                <img src={login} alt="imagem login" />
            </div>

            <section className="section_login">
                <img src={Logo} alt="Logo Event" />

                <form action="" className="form_login" onSubmit={realizarAutenticacao}>
                    <div className="campo_login">

                        <div className="campo_input">
                            <label htmlFor="E-mail"></label>
                            <input type="E-mail" name="Username" placeholder="E-mail"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="campo_input">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" placeholder="Password"
                                value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                    </div>

                    <div className="link_senha">
                        <a href="">Esqueceu a senha?</a>
                    </div>
                    <Botao nomeDoBotao="Login" />
                </form>
            </section>
        </main>
    )
}

export default Login;