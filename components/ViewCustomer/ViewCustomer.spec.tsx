import * as React from 'react';
import * as enzyme from 'enzyme';
import {ViewCustomer, ViewCustomerProps} from './ViewCustomer';
import { mockOriginalCustomerData } from '../../main.constants';


describe("<ViewCustomer/> component", () => {
  const viewCustomerProps: ViewCustomerProps = {
    data: mockOriginalCustomerData,
    openCustomerListView: jest.fn(),
    openEditCustomerView: jest.fn(),
    deleteCustomer: jest.fn(),
  };

  it("should render <ViewCustomer/> component", () => {
    const viewCustomer = enzyme.shallow(<ViewCustomer {...viewCustomerProps}/>);
    expect(viewCustomer.exists()).toBe(true);
  });

  it("should render Invalid Customer ID case in data<ViewCustomer/> component", () => {
    const viewCustomer = enzyme.shallow(<ViewCustomer {...{...viewCustomerProps, data: undefined}}/>);
    expect(viewCustomer.find('.invalidCustomerIdContainer').exists()).toBe(true);
  });

  it("should call correct methods in <ViewCustomer/> component", () => {
    const viewCustomer = enzyme.shallow(<ViewCustomer {...viewCustomerProps}/>);
    viewCustomer.find('.editCustomerButton').simulate('click');
    expect(viewCustomerProps.openEditCustomerView).toBeCalledTimes(1);
    viewCustomer.find('.deleteCustomerButton').simulate('click');
    expect(viewCustomerProps.deleteCustomer).toBeCalledTimes(1);
  });
});
