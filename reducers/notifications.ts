import {ADD_NOTIFICATION, REMOVE_NOTIFICATION, UPDATE_NOTIFICATION} from '../main.constants';
import { NotificationItemProp } from '../components/Notification/Notification';

export const notificationReducer = (state: NotificationItemProp[] = [], action: {type: string; payload: any;}) => {
  switch(action.type) {
    case ADD_NOTIFICATION: return [action.payload, ...state];
    case REMOVE_NOTIFICATION: return state.filter((notification: NotificationItemProp) => notification.id != action.payload);
    case UPDATE_NOTIFICATION: return updateNotification(state, action);
    default: return state;
  }
}

const updateNotification = (state: NotificationItemProp[] = [], action: {type: string; payload: any;}) => {
  const id = action.payload.id;
  return state.map((notification) => {
    if(notification.id === id) {
      return {
        id,
        type: action.payload.type,
        message: action.payload.message,
      }
    }
    return notification;
  })
}
