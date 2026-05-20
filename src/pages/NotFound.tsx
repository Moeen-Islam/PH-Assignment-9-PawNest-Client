import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Home, Search } from "lucide-react";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-lg">
        <motion.div 
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="relative inline-block"
        >
          <div className="text-[12rem] font-display font-black text-white/5 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-brand rounded-[2rem] shadow-2xl shadow-brand/40 rotate-12">
               <PawPrint className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold">Lost your way?</h1>
          <p className="text-gray-400">
            The page you're looking for has wandered off. Don't worry, we'll help you find your way back home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-hover text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand/20">
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <Link to="/pets" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
            <Search className="w-5 h-5" /> Browse Pets
          </Link>
        </div>
      </div>
    </div>
  );
}
