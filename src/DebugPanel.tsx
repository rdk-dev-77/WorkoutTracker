import { useEffect, useState } from "react";

// Painel temporário de diagnóstico — só pra descobrir os números reais de
// viewport/safe-area no iPhone do usuário sem precisar de um Mac pra
// inspecionar. Remover depois de resolver o bug da tab bar.
export default function DebugPanel() {
  const [info, setInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    function medir() {
      const probeSafe = document.createElement("div");
      probeSafe.style.position = "fixed";
      probeSafe.style.bottom = "0";
      probeSafe.style.height = "0";
      probeSafe.style.paddingBottom = "env(safe-area-inset-bottom)";
      probeSafe.style.paddingTop = "env(safe-area-inset-top)";
      document.body.appendChild(probeSafe);
      const cs = getComputedStyle(probeSafe);
      const safeBottom = cs.paddingBottom;
      const safeTop = cs.paddingTop;
      document.body.removeChild(probeSafe);

      const probeDvh = document.createElement("div");
      probeDvh.style.position = "fixed";
      probeDvh.style.top = "0";
      probeDvh.style.height = "100dvh";
      probeDvh.style.width = "0";
      probeDvh.style.visibility = "hidden";
      document.body.appendChild(probeDvh);
      const dvhPx = probeDvh.getBoundingClientRect().height;
      document.body.removeChild(probeDvh);

      const shell = document.querySelector(".app-shell");
      const tabBar = document.querySelector(".tab-bar");
      const shellRect = shell?.getBoundingClientRect();
      const tabBarRect = tabBar?.getBoundingClientRect();

      setInfo({
        "window.innerHeight": `${window.innerHeight}`,
        "window.visualViewport?.height": `${window.visualViewport?.height ?? "n/a"}`,
        "document.documentElement.clientHeight": `${document.documentElement.clientHeight}`,
        "100dvh resolvido (px)": `${dvhPx}`,
        "env(safe-area-inset-top)": safeTop,
        "env(safe-area-inset-bottom)": safeBottom,
        ".app-shell height": shellRect ? `${shellRect.height} (top=${shellRect.top})` : "n/a",
        ".tab-bar bottom edge": tabBarRect ? `${tabBarRect.bottom}` : "n/a",
        "display-mode standalone": `${window.matchMedia("(display-mode: standalone)").matches}`,
      });
    }
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "rgba(255,0,0,0.92)",
        color: "white",
        fontSize: "10px",
        lineHeight: 1.4,
        padding: "4px 6px",
        fontFamily: "monospace",
        maxHeight: "45vh",
        overflowY: "auto",
      }}
    >
      {Object.entries(info).map(([k, v]) => (
        <div key={k}>
          {k}: <strong>{v}</strong>
        </div>
      ))}
    </div>
  );
}
