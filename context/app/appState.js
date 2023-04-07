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
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nonmbre: resultado.data.archivo,
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
  const crearEnlace = () => {};
  return (
    <appContext.Provider
      value={{
        msg_archivo: state.msg_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        mostrarAlerta,
        subirArchivoAlServidor,
        cargando: state.cargando,
        crearEnlace,
      }}>
      {children}
    </appContext.Provider>
  );
};

export default AppState;
