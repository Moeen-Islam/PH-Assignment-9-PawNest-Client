import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Eye,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/src/contexts/AuthContext";
import { cn } from "@/src/lib/utils";

export default function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

  const fetchRequests = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/requests?email=${user?.email}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to load requests");
        return;
      }

      setRequests(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this adoption request?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Failed to cancel request");
        return;
      }

      toast.success("Request cancelled");
      setRequests((prev) => prev.filter((request) => request._id !== id));
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const formatRequestDate = (dateValue: any) => {
    if (!dateValue) return "Recently";
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime()) ? "Recently" : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <HeartHandshake className="h-8 w-8 text-brand" />
        <h1 className="font-display text-3xl font-bold">My Requests</h1>
      </div>

      {requests.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="group flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-card-dark p-6 transition-all hover:border-brand/30 md:flex-row"
            >
              <img
                src={req.petImageUrl}
                alt={req.petName}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=500&q=80";
                }}
                className="h-24 w-24 rounded-xl border border-white/10 object-cover"
              />

              <div className="flex-grow space-y-1 text-center md:text-left">
                <h3 className="text-xl font-bold">{req.petName}</h3>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 md:justify-start">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Requested {formatRequestDate(req.requestDate)}
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Pickup: {req.pickupDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest",
                    req.status === "approved"
                      ? "border-green-400/20 bg-green-400/10 text-green-400"
                      : req.status === "rejected"
                      ? "border-red-400/20 bg-red-400/10 text-red-400"
                      : "border-yellow-400/20 bg-yellow-400/10 text-yellow-400"
                  )}
                >
                  {getStatusIcon(req.status)}
                  {req.status || "pending"}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/pets/${req.petId}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>

                  {req.status === "pending" && (
                    <button
                      onClick={() => cancelRequest(req._id)}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition-all hover:bg-red-400/10 hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-white/5 py-20 text-center">
          <HeartHandshake className="mx-auto mb-4 h-12 w-12 text-gray-700" />
          <p className="text-gray-500">
            No adoption requests yet. Find a friend!
          </p>
          <Link
            to="/pets"
            className="mt-4 inline-block font-bold text-brand underline"
          >
            Browse pets
          </Link>
        </div>
      )}
    </div>
  );
}