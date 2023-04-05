import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducers";
import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA } from "../../types";

import axios from "axios";
import clienteAxios from "../../config/axios";

const AuthState = ({ children }) => {
  const initialState = {
    token: "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      //console.log(process.env.backendURL);
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    } finally {
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA,
        });
      }, 3000);
    }
  };

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
