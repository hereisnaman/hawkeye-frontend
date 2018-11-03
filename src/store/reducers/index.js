import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { dashboardReducer } from './dashboardReducer';
import { boardReducer } from './boardReducer';

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  board: boardReducer,
});
