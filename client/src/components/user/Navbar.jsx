import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiBarChart2,
  FiBookOpen,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
  FiZap,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Practice",
      path: "/practice",
      icon: FiBookOpen,
    },
    {
      name: "Interviews",
      path: "/interviews",
      icon: FiZap,
    },
    {
      name: "Performance",
      path: "/performance",
      icon: FiBarChart2,
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Glass navbar */}
      <div className="border-b border-white/[0.08] bg-[#020617]/75 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 shadow-lg shadow-emerald-500/10 backdrop-blur-xl">
              <div className="absolute inset-0 bg-emerald-400/10 blur-xl transition group-hover:bg-emerald-400/20" />

              <span className="relative text-xs font-bold text-emerald-300">
                IP
              </span>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-sm font-bold tracking-wide text-white">
                InterviewPrep
              </h1>

              <p className="mt-0.5 text-[10px] text-slate-600">
                AI Interview Platform
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "border border-emerald-400/10 bg-emerald-500/[0.08] text-emerald-400 shadow-inner"
                        : "border border-transparent text-slate-500 hover:border-white/[0.05] hover:bg-white/[0.035] hover:text-slate-200"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={16}
                        className={
                          isActive
                            ? "text-emerald-400"
                            : "transition group-hover:text-emerald-400"
                        }
                      />

                      {link.name}

                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 h-px w-5 -translate-x-1/2 bg-emerald-400/70 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Profile */}
            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2 backdrop-blur-xl transition hover:border-emerald-400/15 hover:bg-white/[0.06] md:flex"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-500/10 text-emerald-400">
                <FiUser size={13} />
              </div>

              <span className="text-xs font-medium text-slate-300">
                Profile
              </span>
            </button>

            {/* Settings */}
            <button
              type="button"
              title="Settings"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-500 backdrop-blur-xl transition hover:border-teal-400/15 hover:bg-teal-500/[0.05] hover:text-teal-400 md:flex"
            >
              <FiSettings size={17} />
            </button>

            {/* Logout */}
            <button
              type="button"
              title="Logout"
              onClick={handleLogout}
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-500 backdrop-blur-xl transition hover:border-red-400/20 hover:bg-red-500/[0.07] hover:text-red-400 md:flex"
            >
              <FiLogOut size={17} />
            </button>

            {/* Mobile menu */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-300 backdrop-blur-xl transition hover:border-emerald-400/20 hover:bg-emerald-500/[0.05] hover:text-emerald-400 lg:hidden"
            >
              {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-white/[0.06] bg-[#020617]/90 px-4 py-4 backdrop-blur-2xl lg:hidden">
            <div className="mx-auto max-w-7xl space-y-2 sm:px-2">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "border-emerald-400/15 bg-emerald-500/[0.08] text-emerald-400"
                          : "border-transparent text-slate-500 hover:border-white/[0.06] hover:bg-white/[0.035] hover:text-white"
                      }`
                    }
                  >
                    <Icon size={17} />
                    {link.name}
                  </NavLink>
                );
              })}

              {/* Mobile profile */}
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-left text-sm text-slate-400"
              >
                <FiUser size={17} />
                Profile
              </button>

              {/* Mobile settings */}
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-left text-sm text-slate-400"
              >
                <FiSettings size={17} />
                Settings
              </button>

              {/* Mobile logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl border border-red-400/10 bg-red-500/[0.04] px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/[0.08]"
              >
                <FiLogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
