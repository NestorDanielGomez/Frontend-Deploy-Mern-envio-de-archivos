import { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "@/config/axios";
import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from "../../types/index";

const AppState = ({ children }) => {
  const initialState = {
    msg_archivo: null,
    nombre: "",
    nombre_original: "",
    cargando: null,
    descargas: 1,
    autor: null,
    password: "",
    url: "",
  };

  //creo el dispatch y state

  const [state, dispatch] = useReducer(appReducer, initialState);

  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 5000);
  };

  const subirArchivoAlServidor = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);
      console.log("resultado", resultado);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //una vez subido el enlace , creo el archivo
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      password: state.password,
      autor: state.autor,
      descargas: state.descargas,
    };
    console.log(data);
    try {
      const resultado = await clienteAxios.post("/api/enlaces", data);

      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <appContext.Provider
      value={{
        msg_archivo: state.msg_archivo,
        nombre: "pedro",
        nombre_original: state.nombre_original,
        mostrarAlerta,
        subirArchivoAlServidor,
        crearEnlace,
        cargando: state.cargando,
        autor: state.autor,
        password: state.password,
        url: state.url,
        descargas: state.descargas,
      }}>
      {children}
    </appContext.Provider>
  );
};

export default AppState;
