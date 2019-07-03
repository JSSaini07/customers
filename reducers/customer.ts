import {Customer} from '../main.types';
import {FETCH_ALL_CUSTOMERS, ADD_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER} from '../main.constants';

export const customerReducer = (state: Customer[] = [], action: {type: string; payload: any;}) => {
  switch(action.type) {
    case FETCH_ALL_CUSTOMERS: return fetchAllCustomers(state, action);
    case ADD_CUSTOMER: return addCustomer(state, action);
    case EDIT_CUSTOMER: return editCustomer(state, action);
    case DELETE_CUSTOMER: return deleteCustomer(state, action);
    default: return state;
  }
}

const fetchAllCustomers = (state: Customer[], action: {type: string; payload: any;} ) => {
  return (action.payload && action.payload.status && action.payload.message) ? action.payload.message : state;
}

const addCustomer = (state: Customer[], action: {type: string; payload: any;} ) => {
  if(action.payload && action.payload.status && action.payload.message) {
    const item = action.payload.message;
    return [
      item,
      ...state,
    ];
  }
  return state;
}

const editCustomer = (state: Customer[], action: {type: string; payload: any;} ) => {
  if(action.payload && action.payload.status && action.payload.message) {
    const item = action.payload.message;
    const {customerID} = item;
    return [
      item,
      ...state.filter((item) => item.customerID !== customerID),
    ];
  }
  return state;
}

const deleteCustomer = (state: Customer[], action: {type: string; payload: any;}) => {
  if(action.payload && action.payload.status && action.payload.message) {
    const item = action.payload.message;
    const {customerID} = item;
    return state.filter((item) => item.customerID !== customerID);
  }
  return state;
}
