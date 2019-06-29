
import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppProps {
  message: string;
}

export const App = (props: AppProps) => {
  const {message} = props;
  return <div>{message}</div>;
};

ReactDOM.render(<App message="Hello"/>, document.getElementById("app"));
