import { HashRouter, Routes, Route, NavLink, Outlet, Navigate } from "react-router-dom";
import PlansPage from "./features/plans/PlansPage";
import PlanFormPage from "./features/plans/PlanFormPage";
import NewSessionPage from "./features/sessions/NewSessionPage";
import EvolutionPage from "./features/evolution/EvolutionPage";

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? "tab-link tab-link-active" : "tab-link";
}

function Layout() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <Outlet />
      </div>
      <nav className="tab-bar">
        <NavLink to="/" end className={navClass}>
          Treinos
        </NavLink>
        <NavLink to="/sessao/nova" className={navClass}>
          Registrar
        </NavLink>
        <NavLink to="/evolucao" className={navClass}>
          Evolução
        </NavLink>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PlansPage />} />
          <Route path="/planos/novo" element={<PlanFormPage />} />
          <Route path="/planos/:planId/editar" element={<PlanFormPage />} />
          <Route path="/sessao/nova" element={<NewSessionPage />} />
          <Route path="/evolucao" element={<EvolutionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
