import {combineReducers} from 'redux';
import {customerReducer} from './customer';
import { notificationReducer } from './notifications';

export default combineReducers({
  customers: customerReducer,
  notifications: notificationReducer,
});
