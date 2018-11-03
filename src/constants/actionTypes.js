import keymirror from 'keymirror';

export const actionTypes = keymirror({
  SIGN_IN_USER: null,
  SIGN_OUT_USER: null,
  UPDATE_SIGNING_IN_USER: null,
  LOADING_DASHBOARD: null,
  FETCHING_LISTS: null,
  FETCH_LISTS_SUCCESS: null,
  FETCH_LISTS_FAIL: null,
  FETCHING_LABELS: null,
  FETCH_LABELS_SUCCESS: null,
  FETCH_LABELS_FAIL: null,
});
