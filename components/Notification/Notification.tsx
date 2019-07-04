import * as React from 'react';

export interface NotificationItemProp {
  id: string;
  type: string;
  message: string;
}

interface NotificationProps {
  notifications: NotificationItemProp[];
}

const typeToIconMap = (type: string) => {
  switch(type) {
    case "success": return "far fa-check-circle";
    case "error": return "fa fa-times-circle";
    case "info": return "fas fa-spinner spinner";
    default: return "";
  }
}

const typeToColorMap = (type: string) => {
  switch(type) {
    case "success": return "success";
    case "error": return "error";
    case "info": return "info";
    default: return "";
  }
}

export const NotificationItem: React.FunctionComponent<NotificationItemProp> = (props) => {
  const {id, type, message} = props;
  return (<div key={id} className={`notificationItem ${typeToColorMap(type)}`}>
    <i className={`notificationIcon ${typeToIconMap(type)}`}></i>
    <span className={`notificationMessage`}>{message}</span>
  </div>);
}

export const Notification: React.FunctionComponent<NotificationProps> = (props) => {
  const {notifications} = props;
  return (
    <div className="notificationContainer">
      {
        notifications.map((notification) => {
          return <NotificationItem key={notification.id} id={notification.id} type={notification.type} message={notification.message}/>
        })
      }
    </div>
  );
}
