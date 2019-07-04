import * as React from 'react';
import * as enzyme from 'enzyme';
import {AddEditCustomer, AddEditCustomerProps} from './AddEditCustomer';
import { mockOriginalCustomerData } from '../../main.constants';

describe("<AddEditCustomer/> component", () => {
  const addEditCustomerProps: AddEditCustomerProps = {
    addCustomer: jest.fn(),
    editCustomer: jest.fn(),
  }

  it("should render <AddEditCustomer/> component", () => {
    const addEditCustomer = enzyme.shallow(<AddEditCustomer {...addEditCustomerProps}/>);
    expect(addEditCustomer.exists()).toBe(true);
  });

  it("should call edit customer methos in edit customer if data is valid to <AddEditCustomer/> component", () => {
    const addEditCustomer = enzyme.shallow(<AddEditCustomer {...{...addEditCustomerProps, data: mockOriginalCustomerData}}/>);
    addEditCustomer.find('.addEditCustomer').simulate('click');
    expect(addEditCustomerProps.editCustomer).toBeCalledTimes(1);
  });

  it("should show errors in edit customer if data is incorrect to <AddEditCustomer/> component", () => {
    const addEditCustomer = enzyme.shallow(<AddEditCustomer {...{...addEditCustomerProps, data: {...mockOriginalCustomerData, birthday: ''}}}/>);
    addEditCustomer.find('.addEditCustomer').simulate('click');
    expect(addEditCustomer.find('.errors').exists()).toBe(true);
  });

  it("should show errors in add customer if data is not filled <AddEditCustomer/> component", () => {
    const addEditCustomer = enzyme.shallow(<AddEditCustomer {...addEditCustomerProps}/>);
    addEditCustomer.find('.addEditCustomer').simulate('click');
    expect(addEditCustomer.find('.errors').exists()).toBe(true);
  });

});