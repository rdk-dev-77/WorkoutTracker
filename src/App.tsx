import { HashRouter, Routes, Route, NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import PlansPage from "./features/plans/PlansPage";
import PlanFormPage from "./features/plans/PlanFormPage";
import NewSessionPage from "./features/sessions/NewSessionPage";
import EvolutionPage from "./features/evolution/EvolutionPage";
import { IconDumbbell, IconPlusCircle, IconTrendingUp } from "./icons";

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? "tab-link tab-link-active" : "tab-link";
}

function Layout() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <div className="app-content route-fade" key={location.pathname}>
        <Outlet />
      </div>
      <nav className="tab-bar">
        <NavLink to="/" end className={navClass}>
          <IconDumbbell size={22} />
          <span>Treinos</span>
        </NavLink>
        <NavLink to="/sessao/nova" className={navClass}>
          <IconPlusCircle size={22} />
          <span>Registrar</span>
        </NavLink>
        <NavLink to="/evolucao" className={navClass}>
          <IconTrendingUp size={22} />
          <span>Evolução</span>
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
