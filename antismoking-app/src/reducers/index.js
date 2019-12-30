import { combineReducers } from 'redux';

import scoreReducer from './score';
import userReducer from './user';
import smokeReducer from './smoke';

const rootReducer = combineReducers({
  smoke: smokeReducer,
  user: userReducer,
  score: scoreReducer,
});

export default rootReducer;
