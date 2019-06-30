import {combineReducers} from 'redux';
import {customerReducer} from './customer';
import {viewReducer} from './viewReducer';

export default combineReducers({
  customers: customerReducer,
  viewMode: viewReducer,
});
