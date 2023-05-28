import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import MainPage from "./MainPage";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <MainPage />
  </BrowserRouter>
);

reportWebVitals();
