import React from "react";
import { Provider } from "react-redux";
import  store  from "./Store/Store"
import CombineRouter from "./Routing/CombineRouter";

function App() {
  return (
    <Provider store={store}>
      <CombineRouter />
    </Provider>
  );
}

export default App;
