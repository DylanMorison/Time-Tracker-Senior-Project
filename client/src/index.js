import "materialize-css/dist/css/materialize.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import App from "./components/App";
import reducers from "./reducers";
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
