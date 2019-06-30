import * as React from 'react';
import {CUSTOMERS_LIST, ADD_CUSTOMER ,EDIT_CUSTOMER} from "../../main.constants";

interface HeaderProps {
  viewMode: string;
  openCustomerListView: () => void;
  openAddCustomerView: () => void;
}

const getHeaderTitle = (viewMode: string) => {
  switch(viewMode) {
    case CUSTOMERS_LIST: return "Customer List";
    case ADD_CUSTOMER: return "Add Customer";
    case EDIT_CUSTOMER: return "Edit Customer";
    default: return "Customer List";
  }
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const {viewMode, openCustomerListView, openAddCustomerView} = props;
  const headerTitle = getHeaderTitle(viewMode);
  return (
    <div className="header">
      <div className="title">{headerTitle}</div>
      {
        viewMode === CUSTOMERS_LIST && 
        <div className="newCustomer" onClick={openAddCustomerView}>
          <i className="fa fa-plus"></i>
          Add Customer
        </div>
      }
      {
        viewMode !== CUSTOMERS_LIST && 
        <div className="newCustomer" onClick={openCustomerListView}>
          <i className="fa fa-user"></i>
           Customers List
        </div>
      }
    </div>
  );
}

export default Header;
