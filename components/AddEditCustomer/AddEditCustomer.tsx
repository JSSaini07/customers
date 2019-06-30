
import * as React from "react";
import {useState} from "react";
import { Customer } from "../../main.types";

interface AddEditCustomerProps {
  data?: Customer;
  addCustomer: (values: any) => any;
  editCustomer: (values: any) => any;
}

export const AddEditCustomer: React.FunctionComponent<AddEditCustomerProps> = (props) => {
  const {data = {
    customerID: '',
    name: {first: '', last: '',},
    gender: '',
    birthday: '',
    lastContact: '',
    customerLifetimeValue: '',
  }} = props;

  const parseDateTime = (dtime: string) => {
    const dateTime = new Date(dtime);
    let data: (string | number)[] = [dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
    data = data.map((item: number | string) => {
      return `${item<9 ? '0' : ''}${item}`;
    });
    return `${data[0]}-${data[1]}-${data[2]}T${data[3]}:${data[4]}:${data[5]}`
  }

  const prepData = () => {
    return {
      customerID,
      name: {
        first: first,
        last: last,
      },
      gender,
      birthday,
      lastContact,
      customerLifetimeValue
    }
  }

  const addCustomer = () => {
    const values = prepData();
    props.addCustomer(values);
  }

  const editCustomer = () => {
    const values = prepData();
    props.editCustomer(values);
  }

  const setFieldValue = (event: any) => {
    const value = event.target.value;
    // @ts-ignore
    const method = nameToStateMap[event.target.name];
    method(value);
  }

  const [customerID, setCustomerID] = useState(data.customerID); 
  const [first, setFirst] = useState(data.name.first); 
  const [last, setLast] = useState(data.name.last); 
  const [birthday, setBirthday] = useState(data.birthday); 
  const [lastContact, setLastContact] = useState(data.lastContact); 
  const [gender, setGender] = useState(data.gender); 
  const [customerLifetimeValue, setCustomerLifetimeValue] = useState(data.customerLifetimeValue); 

  const nameToStateMap = {
    customerID: setCustomerID,
    first: setFirst,
    last: setLast,
    birthday: setBirthday,
    gender: setGender,
    customerLifetimeValue: setCustomerLifetimeValue,
    lastContact: setLastContact,
  }

  const mode = props.data ? 'edit' : 'add';

  return (
    <div className="addEditCustomerWrapper">
      <div className="addEditCustomerContainer">
        <div className="fieldRow">
          <div className="fieldLabel">
            Customer ID
          </div>
          <div className="fieldValue">
            <input name="customerID" type="text" placeholder="Enter Customer ID" disabled={mode === "edit"} value={customerID} onChange={setFieldValue}/>
          </div>
        </div>
        <div className="fieldRow">
          <div className="fieldLabel">
            First Name
          </div>
          <div className="fieldValue">
            <input name="first" type="text" placeholder="Enter First Name" value={first} onChange={setFieldValue}/>
          </div>
        </div>
        <div className="fieldRow">
          <div className="fieldLabel">
            Last Name
          </div>
          <div className="fieldValue">
            <input name="last" type="text" placeholder="Enter Last Name" value={last} onChange={setFieldValue}/>
          </div>
        </div>
        <div className="fieldRow">
          <div className="fieldLabel">
            Birth Date
          </div>
          <div className="fieldValue">
            <input name="birthday" type="date" value={birthday} onChange={setFieldValue}/>
          </div>
        </div>
        <div className="fieldRow">
          <div className="fieldLabel">
            Gender
          </div>
          <div className="fieldValue">
            <select name="gender" onChange={setFieldValue}>
              <option value="" selected = {gender === ""}></option>
              <option value="m" selected = {gender === "m"}>Male</option>
              <option value="w" selected = {gender === "w"}>Female</option>
              <option value="o" selected = {gender === "o"}>Other</option>
            </select>
          </div>
        </div>
        <div className="fieldRow">
          <div className="fieldLabel">
            Lifetime Value
          </div>
          <div className="fieldValue">
            <input name="customerLifetimeValue" type="text" placeholder="Enter lifetime value" value={customerLifetimeValue} onChange={setFieldValue}/>
          </div>
        </div>
        <div className="fieldRow">
          <div className="fieldLabel">
            Last Contact
          </div>
          <div className="fieldValue">
            <input name="lastContact" type="datetime-local" value={parseDateTime(lastContact)} onChange={setFieldValue}/>
          </div>
        </div>
        { mode === "add" && <div className="addEditCustomer" onClick={addCustomer}>Add Customer</div> }
        { mode === "edit" && <div className="addEditCustomer" onClick={editCustomer}>Edit Customer</div> }
      </div>
    </div>
  );
}
