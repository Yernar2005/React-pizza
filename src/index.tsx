import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";


import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store , persistor} from "./redux/store";

const rootElem =  document.getElementById('root')

if(rootElem){
  const  root = ReactDOM.createRoot(rootElem)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}

