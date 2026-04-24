import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export function Landing() {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-12">
      <div className="w-20 h-20 rounded-full bg-primary-container grid place-items-center">
        <span className="material-symbols-outlined text-primary text-4xl">spa</span>
      </div>
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-bold leading-tight text-on-surface">
          NutriPlan Tracker
        </h1>
        <p className="text-on-surface-variant text-lg max-w-sm">
          Tu plan nutricional, hecho a tu medida. Calculá tus calorías, elegí un plan y seguilo
          día a día.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Link to="/register"><Button fullWidth size="lg">Crear cuenta</Button></Link>
        <Link to="/login"><Button fullWidth size="lg" variant="ghost">Ya tengo cuenta</Button></Link>
      </div>
    </div>
  );
}
