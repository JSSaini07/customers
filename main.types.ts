export interface Customer {
  customerID: number;
  name: {
    first: string;
    last: string;
  };
  birthday: string;
  gender: string;
  lastContact: string;
  customerLifetimeValue: number;
}

export interface AppState {
  customers: Customer[],
  viewMode: string;
}

export interface RowConfig {
  label: string;
  value: string | number;
  width: number;
}
