import { USUARIO_AUTENTICADO } from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.pauload,
      };
    default:
      return state;
  }
};

export default authReducer;
