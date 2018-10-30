import firebase from 'firebase';

import config from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

const auth = firebase.auth();

auth.instance = firebase.auth;

export default auth;
