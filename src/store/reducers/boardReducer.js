import { actionTypes } from '../../constants/';

const initialState = {
  fetchingLists: true,
  fetchingLabels: true,
  fetchListsSuccess: false,
  fetchLabelsSuccess: false,
  lists: null,
  labels: null,
};

export const boardReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.FETCHING_LISTS:
      return {
        ...state,
        fetchingLists: payload.fetching,
      };
    case actionTypes.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        fetchingLists: false,
        fetchListsSuccess: true,
        lists: payload.lists,
      };
    case actionTypes.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        fetchingLists: false,
        fetchListsSuccess: false,
        lists: null,
      };
    case actionTypes.FETCHING_LABELS:
      return {
        ...state,
        fetchingLabels: payload.fetching,
      };
    case actionTypes.FETCH_LABELS_SUCCESS:
      return {
        ...state,
        fetchingLabels: false,
        fetchLabelsSuccess: true,
        labels: payload.labels,
      };
    case actionTypes.FETCH_LABELS_SUCCESS:
      return {
        ...state,
        fetchingLabels: false,
        fetchLabelsSuccess: false,
        labels: null,
      };
    default:
      return state;
  }
};
