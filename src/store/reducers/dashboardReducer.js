import { actionTypes } from '../../constants/';

const initialState = {
  loading: true,
};

export const dashboardReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.LOADING_DASHBOARD:
      return {
        ...state,
        loading: payload.loading,
      };
    default:
      return state;
  }
};
