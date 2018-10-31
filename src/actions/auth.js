import { actionTypes } from '../constants/';
import auth from '../auth';

const signin = payload => ({
  type: actionTypes.SIGNIN_USER,
  payload,
});

const signout = payload => ({
  type: actionTypes.SIGNOUT_USER,
  payload,
});

export const updateAuthState = dispatch => user => {
  if (user) {
    return dispatch(signin(user));
  }

  return dispatch(signout());
};
