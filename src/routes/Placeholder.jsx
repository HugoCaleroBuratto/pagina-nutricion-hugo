import { Card } from "../components/ui/Card";

export function Placeholder({ title, description, icon = "construction" }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        {description && <p className="text-on-surface-variant mt-2">{description}</p>}
      </header>
      <Card className="text-center space-y-3">
        <span className="material-symbols-outlined text-5xl text-primary">{icon}</span>
        <p className="text-on-surface-variant">
          Pantalla en construcción. Se implementará en la próxima fase del rediseño.
        </p>
      </Card>
    </div>
  );
}
