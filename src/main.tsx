import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./Toast";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);

// PWAs instalados no iOS podem ficar "presos" numa versão antiga do service
// worker por muito tempo, já que o app raramente é totalmente recarregado
// (só sai/volta de background). Forçar uma checagem de atualização toda vez
// que o app volta a ficar visível resolve isso.
if ("serviceWorker" in navigator) {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      navigator.serviceWorker.getRegistration().then((reg) => reg?.update());
    }
  });
}
