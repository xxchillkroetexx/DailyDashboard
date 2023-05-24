import React from "react";
import ReactDOM from "react-dom/client";
import Mainpage from "./MainPage.tsx";
// import './index.css'
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Mainpage />
  </React.StrictMode>
);
