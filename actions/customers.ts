import { FETCH_ALL_CUSTOMERS, ADD_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER, ADD_NOTIFICATION, UPDATE_NOTIFICATION, REMOVE_NOTIFICATION } from "../main.constants";
import { Dispatch } from 'redux';

const notificationTimeout = 2000;

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const fetchAllCustomers = (dispatch: Dispatch) => {
  fetch('http://localhost:3000/fetchAllCustomers').then((res) =>
    dispatch({
      type: FETCH_ALL_CUSTOMERS,
      payload: res.json(),
    })
  ).catch((err) => {});
}

export const addCustomer = (dispatch: Dispatch, values: any) => {
  const notificationId = new Date().getTime();
  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      id: new Date().getTime(),
      type: "info",
      message: `Adding customer with customerID ${values.customerID}`,
    },
  });

  fetch('http://localhost:3000/addCustomer', {method: "POST", headers: HEADERS, body: JSON.stringify(values)}).then((res) =>
    res.ok ? handleSuccess(dispatch, ADD_CUSTOMER, "Successfully added customer", res.json(), notificationId) : handleFail(dispatch, ADD_CUSTOMER, "Couldn't add customer", res.statusText, notificationId)
  ).catch( (err) =>
    handleFail(dispatch, ADD_CUSTOMER, "Couldn't add customer", err, notificationId)
  );
}

export const editCustomer = (dispatch: Dispatch, values: any) => {
  const notificationId = new Date().getTime();
  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      id: new Date().getTime(),
      type: "info",
      message: `Editing customer with customerID ${values.customerID}`,
    },
  })
  
  fetch('http://localhost:3000/updateCustomer', {method: "PUT", headers: HEADERS, body: JSON.stringify(values)}).then((res) =>
    res.ok ? handleSuccess(dispatch, EDIT_CUSTOMER, "Successfully edited customer", res.json(), notificationId) : handleFail(dispatch, EDIT_CUSTOMER , "Couldn't edit customer", res.statusText, notificationId)
  ).catch( (err) =>
    handleFail(dispatch, EDIT_CUSTOMER , "Couldn't edit customer", err, notificationId)
  );
}

export const deleteCustomer = (dispatch: Dispatch, customerID: any) => {
  const notificationId = new Date().getTime();
  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      id: new Date().getTime(),
      type: "info",
      message: `Deleting customer with customerID ${customerID}`,
    },
  })
  
  fetch(`http://localhost:3000/deleteCustomer?id=${customerID}`, {method: "DELETE"}).then((res) =>
    res.ok ? handleSuccess(dispatch, DELETE_CUSTOMER, "Successfully deleted customer", res.json(), notificationId) : handleFail(dispatch, DELETE_CUSTOMER , "Couldn't delete customer", res.statusText, notificationId)
  ).catch( (err) =>
    handleFail(dispatch, DELETE_CUSTOMER , "Couldn't delete customer", err, notificationId)
  );
}



const handleSuccess = (dispatch: Dispatch, type: string, successMessage: string, res: any, notificationId: number) => {
  dispatch({
    type,
    payload: res,
  });
  dispatch({
    type: UPDATE_NOTIFICATION,
    payload: {
      id: notificationId,
      type: "success",
      message: successMessage,
    },
  });
  setTimeout(() => dispatch({
    type: REMOVE_NOTIFICATION,
    payload: notificationId,
  }), notificationTimeout);
}

const handleFail = (dispatch: Dispatch, type: string, message: string, error: string, notificationId: number) => {
  dispatch({
    type: UPDATE_NOTIFICATION,
    payload: {
      id: notificationId,
      type: "error",
      message: `${message} - ${error}`,
    },
  });
  setTimeout(() => dispatch({
    type: REMOVE_NOTIFICATION,
    payload: notificationId,
  }), notificationTimeout);
}
