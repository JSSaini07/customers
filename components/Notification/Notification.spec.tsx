import * as React from 'react';
import * as enzyme from 'enzyme';
import {NotificationItemProp, Notification, NotificationItem} from './Notification';


describe("<NotificationItem/> component", () => {
  const notificationProps: NotificationItemProp = {
    id: 'mockID',
    type: 'success',
    message: 'this is mock message',
  };
  const notifications = [notificationProps, notificationProps, notificationProps];
  it("should render <NotificationItem/> component", () => {
    const notificationItem = enzyme.shallow(<NotificationItem {...notificationProps}/>);
    expect(notificationItem.exists()).toBe(true);
  });

  it("should add appropriate class depending on notification type", () => {
    const notificationItemSuccess = enzyme.shallow(<NotificationItem {...{...notificationProps, type: 'success'}}/>);
    expect(notificationItemSuccess.find('.success').exists()).toBe(true);
   
    const notificationItemInfo = enzyme.shallow(<NotificationItem {...{...notificationProps, type: 'info'}}/>);
    expect(notificationItemInfo.find('.info').exists()).toBe(true);
    
    const notificationItemError = enzyme.shallow(<NotificationItem {...{...notificationProps, type: 'error'}}/>);
    expect(notificationItemError.find('.error').exists()).toBe(true);
  });


  it("should render <Notification/> component", () => {
    const notification = enzyme.shallow(<Notification notifications={notifications}/>);
    expect(notification.exists()).toBe(true);
  });

  it("should render correct amount of notifications in <Notification/> component", () => {
    const notification = enzyme.shallow(<Notification notifications={notifications}/>);
    expect(notification.find(NotificationItem).length).toBe(notifications.length);
  });
});
