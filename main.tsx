
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import allReducers from './reducers';
import AppContainer from "./containers/AppContainer/AppContainer";
import logger from 'redux-logger'

const store = createStore(allReducers, applyMiddleware(ReduxPromise, logger));

class MainApp extends React.Component<any> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="*" component={AppContainer}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<MainApp/>, document.getElementById("app"));
