import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import Reducer from './reducers/';

const initialState = {};

export const getStore = () => createStore(Reducer, initialState, applyMiddleware(thunk));
