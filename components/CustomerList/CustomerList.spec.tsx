import * as React from 'react';
import * as enzyme from 'enzyme';
import {CustomersList, CustomersListProps, TableHeader, TableRows, TablePagination} from './CustomersList';
import { mockCustomerData } from '../../main.constants';

describe("<CustomersList/> component", () => {
  const customerListProps: CustomersListProps = {
    data: Array(100).fill(mockCustomerData),
    openViewCustomerView: jest.fn(),
  }

  it("should render <CustomersList/> component", () => {
    const customersList = enzyme.shallow(<CustomersList {...customerListProps}/>);
    expect(customersList.exists()).toBe(true);
  });

  it("should render <TableHeader/> in <CustomersList/> and pass correct props", () => {
    const customersList = enzyme.shallow(<CustomersList {...customerListProps}/>);
    const tableHeader = customersList.find(TableHeader);
    expect(tableHeader.exists()).toBe(true);
    expect(tableHeader.prop('data')).toEqual(customerListProps.data[0]);
  });

  it("should render <TableRows/> in <CustomersList/> and pass correct props", () => {
    const customersList = enzyme.shallow(<CustomersList {...customerListProps}/>);
    const tableRows = customersList.find(TableRows);
    expect(tableRows.exists()).toBe(true);
    expect(tableRows.prop('data')).toEqual(customerListProps.data.slice(0,20));
    expect(tableRows.prop('openViewCustomerView')).toEqual(customerListProps.openViewCustomerView);
  });

  it("should render <TablePagination/> in <CustomersList/> and pass correct props", () => {
    const customersList = enzyme.shallow(<CustomersList {...customerListProps}/>);
    const tablePagination = customersList.find(TablePagination);
    expect(tablePagination.exists()).toBe(true);
  });
});