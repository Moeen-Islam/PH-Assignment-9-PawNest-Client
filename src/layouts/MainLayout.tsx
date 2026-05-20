import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/src/contexts/AuthContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import {
  PawPrint,
  LogIn,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import Footer from "../components/Footer";

export default function MainLayout() {
  const { user, logout, loginWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-inherit border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-brand rounded-xl group-hover:rotate-12 transition-transform">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight" onClick={scrollToTop}>
                PawNest
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-medium hover:text-brand transition-colors" onClick={scrollToTop}
              >
                Home
              </Link>
              <Link
                to="/pets"
                className="text-sm font-medium hover:text-brand transition-colors"
              >
                All Pets
              </Link>
              {user && (
                <>
                  <Link
                    to="/dashboard/my-requests"
                    className="text-sm font-medium hover:text-brand transition-colors"
                  >
                    My Requests
                  </Link>
                  <Link
                    to="/dashboard/add-pet"
                    className="text-sm font-medium hover:text-brand transition-colors"
                  >
                    Add Pet
                  </Link>
                </>
              )}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 pr-3 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <img
                      src={user.photoURL || ""}
                      alt={user.displayName || ""}
                      className="w-8 h-8 rounded-full border border-white/20"
                    />
                    <span className="text-sm font-medium">
                      {user.displayName?.split(" ")[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-card-dark border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden"
                      >
                        <Link
                          to="/dashboard/my-listings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-white/5"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2 bg-brand hover:bg-brand-hover text-white rounded-full text-sm font-semibold transition-all"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2">
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-inherit"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/pets"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium"
                >
                  All Pets
                </Link>
                {user && (
                  <>
                    <Link
                      to="/dashboard/my-requests"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      My Requests
                    </Link>
                    <Link
                      to="/dashboard/add-pet"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      Add Pet
                    </Link>
                    <Link
                      to="/dashboard/my-listings"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      My Listings
                    </Link>
                    <button
                      onClick={logout}
                      className="text-lg font-medium text-red-400 text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-brand"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
