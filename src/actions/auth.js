import { actionTypes } from '../constants/';
import auth from '../auth';

const signIn = payload => ({
  type: actionTypes.SIGN_IN_USER,
  payload,
});

const signOut = payload => ({
  type: actionTypes.SIGN_OUT_USER,
  payload,
});

export const updateAuthState = dispatch => user => {
  if (user) {
    return dispatch(signIn(user));
  }

  return dispatch(signOut());
};
