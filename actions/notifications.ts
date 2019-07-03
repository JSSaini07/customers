import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../main.constants";
import { NotificationItemProp } from "../components/Notification/Notification";

export const addNotification = (data: NotificationItemProp) => {
  return {
    type: ADD_NOTIFICATION,
    payload: data,
  }
}

export const removeNotification = (data: NotificationItemProp) => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: data,
  }
}
