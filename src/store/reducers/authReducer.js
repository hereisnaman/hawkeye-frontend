import { actionTypes } from '../../constants/';

const initialState = {
  loading: true,
  authenticated: false,
  user: null,
};

export const authReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.SIGNIN_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: payload,
      };
    case actionTypes.SIGNOUT_USER:
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
