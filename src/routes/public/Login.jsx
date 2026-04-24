import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useAuth } from "../../context/AuthContext";

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    const dest = location.state?.from?.pathname ?? "/app/diario";
    navigate(dest, { replace: true });
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Iniciá sesión</h1>
      <Card className="space-y-4" as="form" onSubmit={onSubmit}>
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
          <span className="text-xs font-semibold uppercase tracking-wider text-outline">Contraseña</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 bg-surface-low rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading ? "Ingresando…" : "Ingresar"}
        </Button>
      </Card>
      <p className="text-center text-sm text-on-surface-variant">
        ¿No tenés cuenta? <Link to="/register" className="text-primary font-semibold">Crear una</Link>
      </p>
    </div>
  );
}
