import {combineReducers} from 'redux';
import {customerReducer} from './customer';
import {viewReducer} from './viewReducer';
import { notificationReducer } from './notifications';

export default combineReducers({
  customers: customerReducer,
  viewMode: viewReducer,
  notifications: notificationReducer,
});
