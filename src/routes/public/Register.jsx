import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useAuth } from "../../context/AuthContext";

export function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signUp(email, password, displayName);
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate("/app/calculadora", { replace: true });
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Crear cuenta</h1>
      <Card className="space-y-4" as="form" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-outline">Nombre</span>
          <input
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full mt-1 bg-surface-low rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-outline">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 bg-surface-low rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-outline">
            Contraseña (mín. 8)
          </span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 bg-surface-low rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading ? "Creando…" : "Crear cuenta"}
        </Button>
      </Card>
      <p className="text-center text-sm text-on-surface-variant">
        ¿Ya tenés cuenta? <Link to="/login" className="text-primary font-semibold">Iniciar sesión</Link>
      </p>
    </div>
  );
}
