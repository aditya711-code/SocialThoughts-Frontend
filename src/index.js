import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
const persistConfig = { key: "root", storage, version: 1 };
const persistedReudcer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReudcer,
  middleware: (getDefaultMiddleware) =>
    // here you start calling `getDefaultMiddleware`
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
        <ToastContainer/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
