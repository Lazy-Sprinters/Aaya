import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import './fonts/GraphikRegular.otf'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("Others");
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log("Storage errors");
  }
};

const persistedState = loadState();

const store = createStore(
  // persistedState,
  reducer,
  persistedState
);

store.subscribe(() => {
  saveState({
  	user:store.getState().user,
  	token:store.getState().token,
    phoneNumberVerified:store.getState().phoneNumberVerified,
    phoneNumber:store.getState().phoneNumber,
    role:store.getState().role,
    admin_data:store.getState().admin_data,
    client_data:store.getState().client_data,
    client_service_data:store.getState().client_service_data,
    service_data:store.getState().service_data,
  });
});



ReactDOM.render(
    <Provider store={store}>
    	<App />
    </Provider>
  ,document.getElementById('root')
);