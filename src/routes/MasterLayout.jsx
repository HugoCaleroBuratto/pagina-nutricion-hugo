import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "../components/ui/Icon";

const TABS = [
  { to: "/master/usuarios", icon: "groups",          label: "Usuarios" },
  { to: "/master/planes",   icon: "restaurant_menu", label: "Planes" },
  { to: "/master/foods",    icon: "egg_alt",         label: "Alimentos" },
];

export function MasterLayout() {
  return (
    <div className="min-h-screen bg-bg pb-28">
      <header className="bg-primary text-on-primary sticky top-0 z-40 shadow-soft">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-xl tracking-tight">
            NutriPlan · Master
          </h1>
          <NavLink to="/app/diario" className="text-xs font-semibold uppercase tracking-wider hover:opacity-80">
            Volver a la app
          </NavLink>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-lowest/95 backdrop-blur-lg border-t border-outline-variant/40">
        <div className="max-w-3xl mx-auto flex justify-around items-center px-4 pb-6 pt-3">
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
