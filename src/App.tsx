import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";
import { ThemeProvider } from "@/src/contexts/ThemeContext";



function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center bg-bg-dark text-white">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              
            </Route>
          </Routes>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-card-dark dark:text-white dark:border dark:border-white/10',
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
