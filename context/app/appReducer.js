import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from "../../types/index";

const appReducer = (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return { ...state, msg_archivo: action.payload };
    case LIMPIAR_ALERTA:
      return { ...state, msg_archivo: null };
    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargando: true,
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        cargando: null,
      };
    case SUBIR_ARCHIVO_ERROR:
      return { ...state, msg_archivo: action.payload, cargando: null };

    case CREAR_ENLACE_EXITO:
      return { ...state, url: action.payload };
    default:
      return state;
  }
};

export default appReducer;
