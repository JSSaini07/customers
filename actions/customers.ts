import axios from 'axios';
import { FETCH_ALL_CUSTOMERS, ADD_CUSTOMER, EDIT_CUSTOMER } from "../main.constants";

export const fetchAllCustomers = () => {
  const customers = axios.get('http://localhost:3000/fetchAllCustomers');
  return {
    type: FETCH_ALL_CUSTOMERS,
    payload: customers,
  }
}

export const addCustomer = (values: any) => {
  const customer = axios.post('http://localhost:3000/addCustomer', values);
  return {
    type: ADD_CUSTOMER,
    payload: customer,
  }
}

export const editCustomer = (values: any) => {
  const customer = axios.put('http://localhost:3000/updateCustomer', values);
  return {
    type: EDIT_CUSTOMER,
    payload: customer,
  }
}
