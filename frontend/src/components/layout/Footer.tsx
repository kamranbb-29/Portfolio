import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] border-t border-matrix-500/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-matrix-400 font-bold text-lg mb-3">
              Kamran.dev
            </h3>
            <p className="text-[#999] text-sm">
              Full-stack developer building clean, efficient software.
            </p>
          </div>

          <div>
            <h4 className="text-matrix-400 font-medium mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/kamranbb29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999] hover:text-matrix-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kamranbb29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999] hover:text-matrix-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-matrix-400 font-medium mb-3">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#999] hover:text-matrix-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#999] hover:text-matrix-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-[#999] hover:text-matrix-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#999] hover:text-matrix-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-matrix-500/20 mt-8 pt-4 text-center text-xs text-[#666]">
          <span className="text-matrix-500/50">&copy;</span> {year} Kamran.dev —
          Built with{" "}
          <span className="text-matrix-500">React + Express + MongoDB</span>
        </div>
      </div>
    </footer>
  );
};
