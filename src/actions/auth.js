import auth from '../auth';
import { request } from '../utils/';
import { actionTypes, urls } from '../constants/';

const signIn = payload => ({
  type: actionTypes.SIGN_IN_USER,
  payload,
});

const signOut = payload => ({
  type: actionTypes.SIGN_OUT_USER,
  payload,
});

export const updateAuthState = dispatch => async meta => {
  if (meta) {
    const token = await auth.currentUser.getIdToken(true);

    window.localStorage.setItem('token', token);
    try {
      const user = await request('GET', urls.me);

      return dispatch(signIn({ meta, user }));
    } catch (err) {
      window.localStorage.removeItem('token');

      return auth.signOut();
    }
  }

  window.localStorage.removeItem('token');

  return dispatch(signOut());
};
