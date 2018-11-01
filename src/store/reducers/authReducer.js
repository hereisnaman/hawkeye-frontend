import { actionTypes } from '../../constants/';

const initialState = {
  loading: true,
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
    default:
      return state;
  }
};
