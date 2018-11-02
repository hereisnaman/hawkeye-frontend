import auth from '../auth';
import { request } from '../utils/';
import { actionTypes, urls } from '../constants/';

const signInAction = payload => ({
  type: actionTypes.SIGN_IN_USER,
  payload,
});

const signingInAction = (signingIn = true) => ({
  type: actionTypes.UPDATE_SIGNING_IN_USER,
  payload: {
    signingIn,
  },
});

const signOutAction = payload => ({
  type: actionTypes.SIGN_OUT_USER,
  payload,
});

export const updateAuthState = dispatch => async meta => {
  if (meta) {
    const token = await auth.currentUser.getIdToken(true);

    window.localStorage.setItem('token', token);
    try {
      const user = await request('GET', urls.me);

      return dispatch(signInAction({ meta, user }));
    } catch (err) {
      window.localStorage.removeItem('token');

      return auth.signOut();
    }
  }

  window.localStorage.removeItem('token');

  return dispatch(signOutAction());
};

export const signIn = dispatch => async (email, password, rememberMe) => {
  await dispatch(signingInAction());

  await auth.setPersistence(auth.instance.Auth.Persistence[rememberMe ? 'LOCAL' : 'SESSION']);
  const { user } = await auth.signInWithEmailAndPassword(email, password);

  await dispatch(signingInAction(false));
  await updateAuthState(user);
};

export const signUp = dispatch => async (name, email, password) => {
  await dispatch(signingInAction());

  await auth.setPersistence(auth.instance.Auth.Persistence.LOCAL);
  const data = await auth.createUserWithEmailAndPassword(email, password);
  if (data.additionalUserInfo.isNewUser) {
    const { uid } = data.user;

    await request('POST', urls.signUp, { uid, email, name });
  }

  await dispatch(signingInAction(false));
  await updateAuthState(data.user);
};
