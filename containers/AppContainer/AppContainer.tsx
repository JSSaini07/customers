
import * as React from "react";
import {connect} from 'react-redux';
import { Customer } from "../../main.types";
import {fetchAllCustomers, addCustomer, editCustomer, deleteCustomer} from '../../actions/customers';
import {CustomersList} from "../../components/CustomerList/CustomersList";
import {getRowConfig, CUSTOMERS_LIST, ADD_CUSTOMER ,EDIT_CUSTOMER, VIEW_CUSTOMER} from "../../main.constants";
import { AddEditCustomer } from "../../components/AddEditCustomer/AddEditCustomer";
import { changeViewMode } from "../../actions/view";
import Header from "../../components/Header/Header";
import { ViewCustomer } from "../../components/ViewCustomer/ViewCustomer";
import { Notification, NotificationItemProp } from "../../components/Notification/Notification";

interface AppProps {
  customers: Customer[];
  viewMode: string;
  notifications: NotificationItemProp[],
  fetchAllCustomers: () => Customer[];
  addCustomer: (values: any) => void;
  editCustomer: (values: any) => void;
  deleteCustomer: (customerID: number) => void;
  changeViewMode: (viewMode: string) => void;
}

interface AppState {
  selectedCustomer: number | null;
}

type AppCombinedProps = AppProps & AppState;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppCombinedProps) {
    super(props);
    this.state = {selectedCustomer: null};
  }

  componentWillMount() {
    this.props.fetchAllCustomers();
  }

  openCustomerListView = () => {
    this.props.changeViewMode(CUSTOMERS_LIST);
  }

  openAddCustomerView = () => {
    this.setState(() => ({selectedCustomer: null}));
    this.props.changeViewMode(ADD_CUSTOMER);
  }

  openEditCustomerView = (customerID: number) => {
    this.setState(() => ({selectedCustomer: customerID}));
    this.props.changeViewMode(EDIT_CUSTOMER);
  }

  openViewCustomerView = (customerID: number) => {
    this.setState(() => ({selectedCustomer: customerID}));
    this.props.changeViewMode(VIEW_CUSTOMER);
  }

  render() {
    const {customers, viewMode = ""} = this.props;
    const {selectedCustomer = null} = this.state;

    const headerProps = {
      viewMode,
      openCustomerListView: this.openCustomerListView,
      openAddCustomerView: this.openAddCustomerView,
    }

    const addEditCustomerProps = {
      addCustomer: this.props.addCustomer,
      editCustomer: this.props.editCustomer,
      data: selectedCustomer ? customers.filter((customer) => customer.customerID === selectedCustomer)[0] : undefined,
    }

    const viewCustomerProps = {
      data: selectedCustomer ? customers.filter((customer) => customer.customerID === selectedCustomer)[0] : undefined,
      openEditCustomerView: this.openEditCustomerView,
      deleteCustomer: this.props.deleteCustomer,
      openCustomerListView: this.openCustomerListView,
    }

    const customListProps = {
      data: getRowConfig(customers),
      openViewCustomerView: this.openViewCustomerView,
    }

    const notificationProps = {
      notifications: this.props.notifications,
    };

    return (
        <>
          <Header {...headerProps}/>
          { viewMode === VIEW_CUSTOMER && <ViewCustomer {...viewCustomerProps}/> }
          { (viewMode === ADD_CUSTOMER || viewMode === EDIT_CUSTOMER) && <AddEditCustomer {...addEditCustomerProps}/> }
          { viewMode === CUSTOMERS_LIST && <div className="tableWrapper">
            <CustomersList {...customListProps}/>
          </div>
          }
          <Notification {...notificationProps}/>
        </>
    );
  }
}

const mapStateToProps = (state: AppCombinedProps) => {
  return {
    customers: state.customers,
    viewMode: state.viewMode,
    notifications: state.notifications,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAllCustomers: () => fetchAllCustomers(dispatch),
    addCustomer: (values: any) => addCustomer(dispatch, values),
    editCustomer: (values: any) => editCustomer(dispatch, values),
    changeViewMode: (viewMode: string) => dispatch(changeViewMode(viewMode)),
    deleteCustomer: (customerID: number) =>  deleteCustomer(dispatch, customerID),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
