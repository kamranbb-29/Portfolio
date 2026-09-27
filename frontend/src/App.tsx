import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, AuthRedirect } from "@/components/ProtectedRoute";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import AboutManagement from "@/pages/admin/AboutManagement";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProjectManagement from "@/pages/admin/ProjectManagement";
import ProjectForm from "@/pages/admin/ProjectForm";
import SkillManagement from "@/pages/admin/SkillManagement";
import SkillForm from "@/pages/admin/SkillForm";
import HomeManagement from "@/pages/admin/HomeManagement";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <PublicLayout>
            <Projects />
          </PublicLayout>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <PublicLayout>
            <ProjectDetails />
          </PublicLayout>
        }
      />
      <Route
        path="/skills"
        element={
          <PublicLayout>
            <Skills />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          <Route path="skills" element={<SkillManagement />} />
          <Route path="skills/new" element={<SkillForm />} />
          <Route path="skills/edit/:id" element={<SkillForm />} />
          <Route path="home" element={<HomeManagement />} />
          <Route path="about" element={<AboutManagement />} />
        </Route>
      </Route>

      <Route element={<AuthRedirect />}>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>

      <Route
        path="*"
        element={
          <PublicLayout>
            <NotFound />
          </PublicLayout>
        }
      />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-matrix-400 mb-4">404</h1>
        <p className="text-[#999] mb-4">Page not found</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-matrix-500 text-[#0a0a0a] font-bold rounded hover:bg-matrix-400 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default App;
