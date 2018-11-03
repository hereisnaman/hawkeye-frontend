import { actionTypes } from '../constants/';

export const loadingDashboard = dispatch => (loading = true) =>
  dispatch({
    type: actionTypes.LOADING_DASHBOARD,
    payload: {
      loading,
    },
  });
