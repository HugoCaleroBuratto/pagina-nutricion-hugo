import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { to: "/app/diario",      icon: "calendar_today",   label: "Hoy" },
  { to: "/app/catalogo",    icon: "restaurant_menu",  label: "Planes" },
  { to: "/app/compras",     icon: "shopping_basket",  label: "Compras" },
  { to: "/app/informe",     icon: "monitoring",       label: "Informe" },
  { to: "/app/perfil",      icon: "person",           label: "Perfil" },
];

export function AppLayout() {
  const { profile, role } = useAuth();
  const initial = (profile?.display_name ?? profile?.email ?? "?")[0].toUpperCase();

  return (
    <div className="min-h-screen bg-bg pb-28">
      <header className="bg-surface-lowest sticky top-0 z-40 shadow-soft">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container grid place-items-center font-display font-bold">
              {initial}
            </div>
            <h1 className="font-display font-bold text-xl text-primary tracking-tight">
              NutriPlan
            </h1>
          </div>
          {role === "master" && (
            <NavLink
              to="/master/usuarios"
              className="text-xs font-semibold uppercase tracking-wider text-primary hover:opacity-80"
            >
              Master
            </NavLink>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-lowest/95 backdrop-blur-lg rounded-t-3xl shadow-[0_-10px_40px_rgba(62,102,88,0.08)] border-t border-outline-variant/40">
        <div className="max-w-md mx-auto flex justify-around items-center px-4 pb-6 pt-3">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
                  isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon name={tab.icon} filled={isActive} />
                  <span className="font-display text-[11px] font-semibold">{tab.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
