import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { PublicLayout } from "./routes/PublicLayout";
import { AppLayout } from "./routes/AppLayout";
import { MasterLayout } from "./routes/MasterLayout";

import { Landing } from "./routes/public/Landing";
import { Login } from "./routes/public/Login";
import { Register } from "./routes/public/Register";
import { Placeholder } from "./routes/Placeholder";
import { Calculator } from "./routes/app/Calculator";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Público */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* App (auth requerida) */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/app/diario" replace />} />
            <Route path="calculadora" element={<Calculator />} />
            <Route path="catalogo"    element={<Placeholder title="Catálogo de planes" description="Elegí un plan que se ajuste a tu objetivo." icon="restaurant_menu" />} />
            <Route path="mensual"     element={<Placeholder title="Plan mensual" description="Tu plan en formato calendario." icon="calendar_month" />} />
            <Route path="diario"      element={<Placeholder title="Resumen diario" description="Marcá lo que cumpliste hoy." icon="calendar_today" />} />
            <Route path="compras"     element={<Placeholder title="Lista de compras" description="Cantidades agregadas para la semana o el mes." icon="shopping_basket" />} />
            <Route path="informe"     element={<Placeholder title="Informe de cumplimiento" description="Tus estadísticas de adherencia." icon="monitoring" />} />
            <Route path="perfil"      element={<Placeholder title="Mi perfil" description="Datos personales y plan activo." icon="person" />} />
          </Route>

          {/* Master (rol master requerido) */}
          <Route
            path="/master"
            element={
              <ProtectedRoute requireRole="master">
                <MasterLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/master/usuarios" replace />} />
            <Route path="usuarios" element={<Placeholder title="Usuarios" description="Listado y cumplimiento." icon="groups" />} />
            <Route path="planes"   element={<Placeholder title="Administrar planes" description="CRUD de planes preestablecidos." icon="restaurant_menu" />} />
            <Route path="foods"    element={<Placeholder title="Administrar alimentos" description="CRUD de la base de alimentos." icon="egg_alt" />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
