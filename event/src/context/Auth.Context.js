// importafuncoes do React mecessarias para criar e usar contexto
import { createContext, useState, useContext, Children } from "react";

//cria p contexto de autentificacao, que vai permitir compartilhar dados entre componenetes
const AuthContext = createContext();

//esse componente vai envolver a aplicacao (ou parte dela) e fornecer os dados de autentificacao para os filhos
//provider = prover/dar
export const AuthProvider = ({Children}) => {
    //cria um estado que guarda os dados do usuario logado
    const [usuario, setUsuario] = useState(null);

    return(
        //o authcontext.provider permite que qualquer componente dentro de acesse o usuario e setusuario
        //faz com que qualquer componente que esteja dentrro de <authprovider> consiga acessar o valor {usuario, setusuario} usando hook useauth
        <AuthContext.Provider value={{usuario, setUsuario}} >
            {Children}
        </AuthContext.Provider> 
    );
};

// esse hook personalix=zado facilita o acesso ao contexto dentro de qualquer componente
//USAR!!!
export const useauth = () => useContext(AuthContext);
