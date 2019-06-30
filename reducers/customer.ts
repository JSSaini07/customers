import {Customer} from '../main.types';
import {FETCH_ALL_CUSTOMERS, ADD_CUSTOMER, EDIT_CUSTOMER} from '../main.constants';

export const customerReducer = (state: Customer[] = [], action: {type: string; payload: any;}) => {
  switch(action.type) {
    case FETCH_ALL_CUSTOMERS: return fetchAllCustomers(action);
    case ADD_CUSTOMER: return addCustomer(state, action);
    case EDIT_CUSTOMER: return editCustomer(state, action);
    default: return state;
  }
}

const fetchAllCustomers = (action: {type: string; payload: any;} ) => {
  return (action.payload.data && action.payload.data.status && action.payload.data.message) ? action.payload.data.message : [];
}

const addCustomer = (state: Customer[], action: {type: string; payload: any;} ) => {
  if(action.payload.data && action.payload.data.status && action.payload.data.message) {
    const item = action.payload.data.message;
    return [
      item,
      ...state,
    ];
  }
  return state;
}

const editCustomer = (state: Customer[], action: {type: string; payload: any;} ) => {
  if(action.payload.data && action.payload.data.status && action.payload.data.message) {
    const item = action.payload.data.message;
    const {customerID} = item;
    return [
      item,
      ...state.filter((item) => item.customerID !== customerID),
    ];
  }
  return state;
}

