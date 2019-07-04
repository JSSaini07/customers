
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import allReducers from './reducers';
import AppContainer from "./containers/AppContainer/AppContainer";
import logger from 'redux-logger'
import { ADD_CUSTOMER, VIEW_CUSTOMER } from "./main.constants";

const store = createStore(allReducers, applyMiddleware(ReduxPromise, logger));

class MainApp extends React.Component<any> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/viewCustomer/:id" render={({ match, history }) => <AppContainer viewMode={VIEW_CUSTOMER} selectedCustomer={parseInt(match.params.id)} history={history}/>} />
            <Route exact path="/" render={({ history }) => <AppContainer history={history}/>} />
            </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<MainApp/>, document.getElementById("app"));
