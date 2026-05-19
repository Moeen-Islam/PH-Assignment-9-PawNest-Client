import React from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/src/contexts/AuthContext";
import { LayoutDashboard, PlusCircle, ListChecks, HeartHandshake } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" replace />;

  const menuItems = [
    { label: "My Requests", path: "/dashboard/my-requests", icon: HeartHandshake },
    { label: "Add Pet", path: "/dashboard/add-pet", icon: PlusCircle },
    { label: "My Listings", path: "/dashboard/my-listings", icon: ListChecks },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card-dark border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-brand" />
              Dashboard
            </h2>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive 
                        ? "bg-brand text-white shadow-lg shadow-brand/20" 
                        : "hover:bg-white/5 text-gray-400 hover:text-white"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
