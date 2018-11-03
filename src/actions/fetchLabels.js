import { request } from '../utils/';
import { actionTypes, urls } from '../constants/';

const fetchingLabels = (fetching = true) => ({
  type: actionTypes.FETCHING_LABELS,
  payload: {
    fetching,
  },
});

const fetchLabelsSuccess = payload => ({
  type: actionTypes.FETCH_LABELS_SUCCESS,
  payload,
});

const fetchLabelsFail = payload => ({
  type: actionTypes.FETCH_LABELS_FAIL,
  payload,
});

export const fetchLabels = dispatch => async () => {
  await dispatch(fetchingLabels());
  try {
    const data = await request('GET', urls.labels);

    return dispatch(fetchLabelsSuccess(data));
  } catch (err) {
    return dispatch(fetchLabelsFail());
  }
};
