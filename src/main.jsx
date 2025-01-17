import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  //{Store} di ambil dari Store.js yang uhda dbuat
  <Provider store={store}>
    <App />
    <ToastContainer position="top-left" />
  </Provider>
);
