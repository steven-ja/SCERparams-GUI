import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SCERPAConfigGenerator from './pages/ConfigGenerator';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <SCERPAConfigGenerator />
  </React.StrictMode>,
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <SCERPAConfigGenerator />
//   </React.StrictMode>,
// );
