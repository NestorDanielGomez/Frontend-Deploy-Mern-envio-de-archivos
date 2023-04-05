import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA } from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
      };
    case REGISTRO_ERROR:
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };

    default:
      return state;
  }
};

export default authReducer;
