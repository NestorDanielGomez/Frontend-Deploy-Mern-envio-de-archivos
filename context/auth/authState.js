import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducers";
import { USUARIO_AUTENTICADO } from "../../types";

const AuthState = ({ children }) => {
  const initialState = {
    token: "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = (datos) => {};

  const usuarioAutenticado = (nombre) => {
    dispatch({
      type: USUARIO_AUTENTICADO,
      payload: nombre,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        usuarioAutenticado,
        registrarUsuario,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
