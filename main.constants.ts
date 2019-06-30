import { AppState, Customer, RowConfig } from "./main.types";

export const FETCH_ALL_CUSTOMERS: string = 'fetchAllCustomers';
export const ADD_CUSTOMER: string = 'addCustomer';
export const EDIT_CUSTOMER: string = 'editCustomer';
export const CUSTOMERS_LIST: string = 'customersListView';
export const CHANGE_VIEW_MODE: string = 'changeViewMode';

export const DefaultAppState: AppState = {
  customers: [],
  viewMode: '',
}

export const getRowConfig: (dataList: Customer[]) => RowConfig[][] = (dataList) => {
  return dataList.map((data) => [
    {
      label: 'Customer ID',
      value: data.customerID,
      width: 8,
    },
    {
      label: 'Name',
      value: data.name.first + ' ' +data.name.last,
      width: 17,
    },
    {
      label: 'Gender',
      value: data.gender == "m" ? "Male" : ( data.gender == "w" ? "Female" : "Other"),
      width: 10,
    },
    {
      label: 'Birth Date',
      value: parseDateTime(data.birthday),
      width: 20,
    },
    {
      label: 'Last Contact',
      value: parseDateTime(data.lastContact, true),
      width: 20,
    },
    {
      label: 'Lifetime Value',
      value: data.customerLifetimeValue,
      width: 24,
    },
  ]);
}

export const parseDateTime = (dateTime: string, time = false) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateTime);
  return time ? date.toLocaleTimeString("en-US", dateOptions) : date.toLocaleDateString("en-US", dateOptions) ;
}
