// Registro manual do service worker (em vez do script injetado automaticamente
// pelo vite-plugin-pwa) para poder controlar `updateViaCache`.
//
// Motivo: um PWA instalado no iOS raramente sofre um reload completo (só
// sai/volta de background), e o navegador pode servir uma cópia em cache do
// próprio arquivo `sw.js` quando o app checa por atualização — nesse caso a
// checagem "encontra" a mesma versão antiga de novo e nunca atualiza.
// `updateViaCache: "none"` faz o navegador sempre buscar o sw.js de verdade
// na rede ao checar por update, ignorando cache HTTP para esse arquivo.
export function registerSW(): void {
  if (!("serviceWorker" in navigator) || !import.meta.env.PROD) return;

  const swUrl = `${import.meta.env.BASE_URL}sw.js`;

  navigator.serviceWorker.register(swUrl, { updateViaCache: "none" }).then((registration) => {
    let jaRecarregou = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (jaRecarregou) return;
      jaRecarregou = true;
      window.location.reload();
    });

    const checarAtualizacao = () => registration.update();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") checarAtualizacao();
    });
    window.addEventListener("focus", checarAtualizacao);

    checarAtualizacao();
  });
}
