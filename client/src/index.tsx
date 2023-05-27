import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import MainPage from "./MainPage";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <MainPage />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
