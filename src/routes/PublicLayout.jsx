import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-md mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
