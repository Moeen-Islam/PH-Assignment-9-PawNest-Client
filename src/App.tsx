import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";
import { ThemeProvider } from "@/src/contexts/ThemeContext";

// Layouts
import MainLayout from "@/src/layouts/MainLayout";
import DashboardLayout from "@/src/layouts/DashboardLayout";

// Pages
import Home from "@/src/pages/Home";
import AllPets from "@/src/pages/AllPets";
import PetDetails from "@/src/pages/PetDetails";
import Login from "@/src/pages/Login";
import Register from "@/src/pages/Register";
import MyRequests from "@/src/pages/dashboard/MyRequests";
import AddPet from "@/src/pages/dashboard/AddPet";
import MyListings from "@/src/pages/dashboard/MyListings";
import UpdatePet from "@/src/pages/dashboard/UpdatePet";
import NotFound from "@/src/pages/NotFound"



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
              
              <Route path="/" element={<Home />} />
              <Route path="/pets" element={<AllPets />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                <Route path="my-requests" element={<MyRequests />} />
                <Route path="add-pet" element={<AddPet />} />
                <Route path="my-listings" element={<MyListings />} />
                <Route path="update-pet/:id" element={<UpdatePet />} />
              </Route>

              <Route path="/pets/:id" element={<PetDetails />} />
              
              <Route path="*" element={<NotFound />} />
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
