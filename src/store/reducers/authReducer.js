import { actionTypes } from '../../constants/';

const initialState = {
  loading: true,
  signingIn: false,
  authenticated: false,
  meta: null,
  user: null,
};

export const authReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.SIGN_IN_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        meta: payload.meta,
        user: payload.user,
      };
    case actionTypes.SIGN_OUT_USER:
      return {
        ...state,
        loading: false,
        authenticated: false,
        meta: null,
        user: null,
      };
    case actionTypes.UPDATE_SIGNING_IN_USER:
      return {
        ...state,
        signingIn: payload.signingIn,
      };
    default:
      return state;
  }
};
