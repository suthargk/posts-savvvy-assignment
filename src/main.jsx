import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./store/reducer/index.js";
import React from "react";

const rootReducer = combineReducers({ postState: reducer });

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
