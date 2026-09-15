import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./Toast";
import { registerSW } from "./registerSW";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);

registerSW();

// Reforço para o bug de 100dvh calculando errado no primeiro paint de um
// PWA recém-aberto no iOS (ver comentário em .app-shell no index.css).
function ajustarAlturaReal() {
  document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
}
ajustarAlturaReal();
window.addEventListener("resize", ajustarAlturaReal);
window.addEventListener("orientationchange", ajustarAlturaReal);
