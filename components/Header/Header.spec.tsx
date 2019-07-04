import * as React from 'react';
import * as enzyme from 'enzyme';
import {Header, HeaderProps} from './Header';
import { CUSTOMERS_LIST, ADD_CUSTOMER } from '../../main.constants';


describe("<Header/> component", () => {
  const headerProps: HeaderProps = {
    viewMode: 'mockViewMode',
    openAddCustomerView: jest.fn(),
    openCustomerListView: jest.fn(),
  }
  it("should render <Header/> component", () => {
    const header = enzyme.shallow(<Header {...headerProps}/>);
    expect(header.exists()).toBe(true);
  });

  it("should render appropriate button and should call appropraite action on button click", () => {
    const headerPropsView = {...headerProps, viewMode: CUSTOMERS_LIST};
    const headerView = enzyme.shallow(<Header {...headerPropsView}/>);
    const addCustomViewButton = headerView.find(".newCustomer");
    expect(addCustomViewButton.exists()).toBe(true);
    expect(headerProps.openAddCustomerView).not.toBeCalled();
    addCustomViewButton.simulate('click');
    expect(headerProps.openAddCustomerView).toBeCalledTimes(1);

    const headerPropsAdd = {...headerProps, viewMode: ADD_CUSTOMER};
    const headerAdd = enzyme.shallow(<Header {...headerPropsAdd}/>);
    const customListViewButton = headerAdd.find(".listCustomer");
    expect(customListViewButton.exists()).toBe(true);
    expect(headerProps.openCustomerListView).not.toBeCalled();
    customListViewButton.simulate('click');
    expect(headerProps.openCustomerListView).toBeCalledTimes(1);
  });
});