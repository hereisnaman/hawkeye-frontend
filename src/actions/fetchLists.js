import { request } from '../utils/';
import { actionTypes, urls } from '../constants/';

const fetchingLists = (fetching = true) => ({
  type: actionTypes.FETCHING_LISTS,
  payload: {
    fetching,
  },
});

const fetchListsSuccess = payload => ({
  type: actionTypes.FETCH_LISTS_SUCCESS,
  payload,
});

const fetchListsFail = payload => ({
  type: actionTypes.FETCH_LISTS_FAIL,
  payload,
});

export const fetchLists = dispatch => async () => {
  await dispatch(fetchingLists());
  try {
    const data = await request('GET', urls.lists);

    return dispatch(fetchListsSuccess(data));
  } catch (err) {
    return dispatch(fetchListsFail());
  }
};
