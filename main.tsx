
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import allReducers from './reducers';
import AppContainer from "./containers/AppContainer/AppContainer";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
let store = createStoreWithMiddleware(allReducers);

class MainApp extends React.Component<any> {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

ReactDOM.render(<MainApp/>, document.getElementById("app"));
