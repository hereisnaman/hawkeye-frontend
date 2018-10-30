import { actionTypes } from '../../constants/';

const initialState = {
  loading: true,
  user: null,
};

export const authReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.SIGNIN_USER:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case actionTypes.SIGNOUT_USER:
      return {
        ...state,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
