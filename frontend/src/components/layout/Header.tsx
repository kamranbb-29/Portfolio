import { NavLink, Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Contact", to: "/contact" },
];

export const Header = () => {
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(to);
  };

  return (
    <header className="bg-[#0d0d0d] border-b border-matrix-500/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-matrix-400 text-xl font-bold tracking-wider"
        >
          <span className="text-white">&lt;</span>Kamran.dev<span className="text-matrix-400">/</span>
        </Link>

        <nav className="flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                isActive(item.to)
                  ? "bg-matrix-500/20 text-matrix-300 border border-matrix-500/40"
                  : "text-[#999] hover:text-matrix-400 hover:bg-matrix-500/10"
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
