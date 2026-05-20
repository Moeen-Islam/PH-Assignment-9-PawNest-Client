import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/src/contexts/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/lib/firebase";
import { LogIn, Mail, Lock, Sparkles, PawPrint } from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || "/";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card-dark border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-brand/10 rounded-2xl mb-4">
            <PawPrint className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to PawNest and continue your journey.
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-colors text-sm"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-colors text-sm"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            className="w-full py-4 bg-brand hover:bg-brand-hover text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                <LogIn className="w-5 h-5" /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-gray-500 font-bold">
            <span className="bg-card-dark px-4">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 font-bold text-white transition hover:bg-white/15 mb-3"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-6 w-6"
          />
          Google Login
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand font-bold hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
