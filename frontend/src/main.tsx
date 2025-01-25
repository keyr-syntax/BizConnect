import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import NotificationToaster from "./components/ui/NotificationToaster.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NotificationToaster>
      <App />
    </NotificationToaster>
  </BrowserRouter>
);
