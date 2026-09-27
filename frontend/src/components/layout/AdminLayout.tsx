import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

const adminNavItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Projects", to: "/admin/projects" },
  { label: "Skills", to: "/admin/skills" },
  { label: "Home", to: "/admin/home" },
  { label: "About", to: "/admin/about" },
];

export const AdminLayout = () => {
  const { admin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <aside className="relative w-64 border-r border-matrix-500/20 bg-[#0d0d0d]">
        <div className="p-6 border-b border-matrix-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-matrix-500/20 flex items-center justify-center">
              <span className="text-matrix-400 font-bold">A</span>
            </div>
            <div>
              <p className="text-sm text-[#999]">Admin</p>
              <p className="text-[#e0e0e0] font-medium">{admin?.email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-matrix-500/20 text-matrix-300 border border-matrix-500/40"
                    : "text-[#999] hover:text-matrix-400 hover:bg-matrix-500/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
