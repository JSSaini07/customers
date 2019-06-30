
import * as React from "react";
import {connect} from 'react-redux';
import { Customer } from "../../main.types";
import {fetchAllCustomers, addCustomer, editCustomer} from '../../actions/customers';
import {CustomersList} from "../../components/CustomerList/CustomersList";
import {getRowConfig, CUSTOMERS_LIST, ADD_CUSTOMER ,EDIT_CUSTOMER} from "../../main.constants";
import { AddEditCustomer } from "../../components/AddEditCustomer/AddEditCustomer";
import { changeViewMode } from "../../actions/view";
import Header from "../../components/Header/Header";

interface AppProps {
  customers: Customer[];
  viewMode: string;
  fetchAllCustomers: () => Customer[];
  addCustomer: (values: any) => any;
  editCustomer: (values: any) => any;
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
    const customListProps = {
      data: getRowConfig(customers),
      openEditCustomerView: this.openEditCustomerView,
    }

    return (
        <>
          <Header {...headerProps}/>
          { viewMode !== CUSTOMERS_LIST && <AddEditCustomer {...addEditCustomerProps}/> }
          { viewMode === CUSTOMERS_LIST && <div className="tableWrapper">
            <CustomersList {...customListProps}/>
          </div>
          }
        </>
    );
  }
}

const mapStateToProps = (state: AppCombinedProps) => {
  return {
    customers: state.customers,
    viewMode: state.viewMode,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAllCustomers: () => dispatch(fetchAllCustomers()),
    addCustomer: (values: any) => dispatch(addCustomer(values)),
    editCustomer: (values: any) => dispatch(editCustomer(values)),
    changeViewMode: (viewMode: string) => dispatch(changeViewMode(viewMode)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
