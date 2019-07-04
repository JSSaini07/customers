import { AppState, Customer, RowConfig } from "./main.types";

export const FETCH_ALL_CUSTOMERS: string = 'fetchAllCustomers';
export const ADD_CUSTOMER: string = 'addCustomer';
export const EDIT_CUSTOMER: string = 'editCustomer';
export const DELETE_CUSTOMER: string = 'deleteCustomer';
export const VIEW_CUSTOMER: string = 'viewCustomer';
export const CUSTOMERS_LIST: string = 'customersListView';
export const CHANGE_VIEW_MODE: string = 'changeViewMode';

export const ADD_NOTIFICATION: string = 'addNotification';
export const REMOVE_NOTIFICATION: string = 'removeNotification';
export const UPDATE_NOTIFICATION: string = 'updateNotification';


export const DefaultAppState: AppState = {
  customers: [],
  viewMode: '',
}

export const emptyCustomer = {
  customerID: 0, name: {first: '', last: ''}, gender: '', birthday: '', lastContact: '', customerLifetimeValue: '',
}

export const getRowConfig: (dataList: Customer[]) => RowConfig[][] = (dataList) => {
  return dataList.map((data, index) => [
    {
      label: 'S.No.',
      value: index,
      width: 8,
    },
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
      width: 18,
    },
    {
      label: 'Last Contact',
      value: parseDateTime(data.lastContact, true),
      width: 18,
    },
    {
      label: 'Lifetime Value',
      value: data.customerLifetimeValue,
      width: 20,
    },
  ]);
}

export const mockCustomerData = [{
    label: 'S.No.',
    value: 1,
    width: 8,
  },
  {
    label: 'Customer ID',
    value: 1,
    width: 8,
  },
  {
    label: 'Name',
    value: 'mock name',
    width: 17,
  },
  {
    label: 'Gender',
    value: 'm',
    width: 10,
  },
  {
    label: 'Birth Date',
    value: '',
    width: 18,
  },
  {
    label: 'Last Contact',
    value: '',
    width: 18,
  },
  {
    label: 'Lifetime Value',
    value: 0,
    width: 20,
  }
];

export const mockOriginalCustomerData = {
  customerID: 1,
  name: {
    first: 'mock',
    last: 'mock',
  },
  birthday: 'mock',
  gender: 'm',
  lastContact: '1234',
  customerLifetimeValue: 1234,
}

export const parseDateTime = (dateTime: string, time = false) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateTime);
  return time ? date.toLocaleTimeString("en-US", dateOptions) : date.toLocaleDateString("en-US", dateOptions) ;
}
