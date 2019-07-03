
import * as React from "react";
import { Customer } from "../../main.types";

interface ViewCustomerProps {
  data: Customer;
  openEditCustomerView: (customID: number) => void;
  deleteCustomer: (customID: number) => void;
  openCustomerListView: () => void;
}

export const ViewCustomer: React.FunctionComponent<ViewCustomerProps> = (props) => {
  const {data: {
    customerID,
    name: {first, last,},
    gender,
    birthday,
    lastContact,
    customerLifetimeValue,
  }} = props;

  const openEditCustomerView = () => {
    props.openEditCustomerView(customerID);
  }

  const deleteCustomer = () => {
    props.openCustomerListView();
    props.deleteCustomer(customerID);
  }

  const parseDateTime = (dtime: string) => {
    const dateTime = new Date(dtime);
    let data: (string | number)[] = [dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
    data = data.map((item: number | string) => {
      return `${item<9 ? '0' : ''}${item}`;
    });
    return `${data[0]}-${data[1]}-${data[2]}T${data[3]}:${data[4]}:${data[5]}`
  }

  return (
    <div className="viewCustomerWrapper">
      <div className="viewCustomerContainer">
        <div className="fields">
          <div className="fieldRow">
            <div className="fieldLabel">
              Customer ID
            </div>
            <div className="fieldValue">
              <div className="inputValue">{customerID}</div>
            </div>
          </div>
          <div className="fieldRow">
            <div className="fieldLabel">
              First Name
            </div>
            <div className="fieldValue">
              <div className="inputValue">{first}</div>
            </div>
          </div>
          <div className="fieldRow">
            <div className="fieldLabel">
              Last Name
            </div>
            <div className="fieldValue">
              <div className="inputValue">{last}</div>
            </div>
          </div>
          <div className="fieldRow">
            <div className="fieldLabel">
              Birth Date
            </div>
            <div className="fieldValue">
              <div className="inputValue">{birthday}</div>
            </div>
          </div>
          <div className="fieldRow">
            <div className="fieldLabel">
              Gender
            </div>
            <div className="fieldValue">
              <div className="inputValue">{gender === "m" ? "Male" : (gender === "w" ? "Female" : "Other")}</div>
            </div>
          </div>
          <div className="fieldRow">
            <div className="fieldLabel">
              Lifetime Value
            </div>
            <div className="fieldValue">
              <div className="inputValue">{customerLifetimeValue}</div>  
            </div>
          </div>
          <div className="fieldRow">
            <div className="fieldLabel">
              Last Contact
            </div>
            <div className="fieldValue">
              <div className="inputValue">{lastContact}</div>
            </div>
          </div>
          <div className="editCustomerButton" onClick={openEditCustomerView}>Edit Customer</div>
          <div className="deleteCustomerButton" onClick={deleteCustomer}>Delete Customer</div>
        </div>
      </div>
    </div>
  );
}
