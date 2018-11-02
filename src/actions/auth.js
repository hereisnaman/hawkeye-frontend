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

  try {
    await auth.setPersistence(auth.instance.Auth.Persistence[rememberMe ? 'LOCAL' : 'SESSION']);
    const { user } = await auth.signInWithEmailAndPassword(email, password);

    await updateAuthState(dispatch)(user);
    await dispatch(signingInAction(false));
  } catch (err) {
    await dispatch(signingInAction(false));

    throw err;
  }
};

export const signUp = dispatch => async (name, email, password) => {
  await dispatch(signingInAction());

  try {
    await auth.setPersistence(auth.instance.Auth.Persistence.LOCAL);
    const { additionalUserInfo, user } = await auth.createUserWithEmailAndPassword(email, password);
    if (additionalUserInfo.isNewUser) {
      const { uid } = user;

      await request('POST', urls.signUp, { uid, email, name });
    }

    await updateAuthState(dispatch)(user);
    await dispatch(signingInAction(false));
  } catch (err) {
    await dispatch(signingInAction(false));

    throw err;
  }
};

export const signInWithGoogle = dispatch => async () => {
  await dispatch(signingInAction());

  try {
    await auth.setPersistence(auth.instance.Auth.Persistence.LOCAL);
    const provider = new auth.instance.GoogleAuthProvider();
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
    if (additionalUserInfo.isNewUser) {
      const { email, name, picture: avatar } = additionalUserInfo.profile;
      const { uid } = user;

      await request('POST', urls.signUp, { uid, email, name, avatar });
    }

    await updateAuthState(dispatch)(user);
    await dispatch(signingInAction(false));
  } catch (err) {
    await dispatch(signingInAction(false));

    throw err;
  }
};

export const signInWithGithub = dispatch => async () => {
  await dispatch(signingInAction());

  try {
    await auth.setPersistence(auth.instance.Auth.Persistence.LOCAL);
    const provider = new auth.instance.GithubAuthProvider();
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
    if (additionalUserInfo.isNewUser) {
      const { email, name, picture: avatar } = additionalUserInfo.profile;
      const { uid } = user;

      await request('POST', urls.signUp, { uid, email, name, avatar });
    }

    await updateAuthState(dispatch)(user);
    await dispatch(signingInAction(false));
  } catch (err) {
    await dispatch(signingInAction(false));

    throw err;
  }
};
