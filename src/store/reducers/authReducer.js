import { actionTypes } from '../../constants/';

const initialState = {
  loading: true,
  authenticated: false,
  user: null,
};

export const authReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.SIGN_IN_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: payload,
      };
    case actionTypes.SIGN_OUT_USER:
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
