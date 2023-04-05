import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducers";
import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

import axios from "axios";
import clienteAxios from "../../config/axios";
import tokenAuth from "@/config/tokenAuth";

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
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

  //devuelvo el usuario autenticado en base al TOKEN

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");
      console.log("respuesta", respuesta);
      if (respuesta.data.usuario) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: respuesta.data.usuario,
        });
      }
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      console.log("iniciar sesion respuesta", respuesta);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
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

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
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
        iniciarSesion,
        cerrarSesion,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
