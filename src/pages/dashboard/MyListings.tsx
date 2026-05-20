import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ListChecks,
  Eye,
  Edit3,
  Trash2,
  Users,
  X,
  Check,
  Activity,
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/src/contexts/AuthContext";
import { cn } from "@/src/lib/utils";

export default function MyListings() {
  const { user } = useAuth();
  const [pets, setPets] = useState<any[]>([]);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestsModal, setShowRequestsModal] = useState(false);

  useEffect(() => {
    if (user?.email) fetchPets();
  }, [user?.email]);

  const fetchPets = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/pets?ownerEmail=${encodeURIComponent(
          user?.email || ""
        )}`,
        { credentials: "include" }
      );

      const data = await res.json();
      setPets(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/pets/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Failed to delete listing");
        return;
      }

      toast.success("Listing deleted");
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleOpenRequests = async (pet: any) => {
    setSelectedPet(pet);

    try {
      const res = await fetch(
        `http://localhost:5000/api/requests?petId=${pet._id}`,
        { credentials: "include" }
      );

      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
      setShowRequestsModal(true);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  const handleRequestAction = async (
    requestId: string,
    action: "approved" | "rejected"
  ) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          status: action,
          petId: selectedPet._id,
        }),
      });

      if (!res.ok) {
        toast.error("Operation failed");
        return;
      }

      toast.success(`Request ${action}`);
      setShowRequestsModal(false);
      fetchPets();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const stats = {
    total: pets.length,
    available: pets.filter((p) => p.status === "available").length,
    adopted: pets.filter((p) => p.status === "adopted").length,
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <ListChecks className="h-8 w-8 text-brand" />
          <h1 className="font-display text-3xl font-bold">My Listings</h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <StatCard label="Total" value={stats.total} icon={Activity} />
          <StatCard label="Available" value={stats.available} icon={Heart} />
          <StatCard label="Adopted" value={stats.adopted} icon={Check} />
        </div>
      </div>

      {pets.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="overflow-hidden rounded-2xl border border-blue-500/20 bg-[#0B1324] shadow-xl shadow-black/20"
            >
              <div className="relative h-44">
                <img
                  src={pet.imageUrl || pet.image}
                  alt={pet.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80";
                  }}
                  className="h-full w-full object-cover"
                />

                <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  {pet.status || "available"}
                </span>
              </div>

              <div className="space-y-3 p-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{pet.name}</h3>
                    <p className="text-sm text-slate-400">
                      {pet.species} • {pet.breed}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-orange-500">৳{pet.adoptionFee}</p>
                    <p className="text-xs text-slate-500">
                      {pet.requestCount || 0} requests
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={`/pets/${pet._id}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/10"
                  >
                    <Eye className="h-4 w-4" /> View
                  </Link>

                  <Link
                    to={`/dashboard/update-pet/${pet._id}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/10"
                  >
                    <Edit3 className="h-4 w-4" /> Edit
                  </Link>

                  <button
                    onClick={() => handleOpenRequests(pet)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/20"
                  >
                    <Users className="h-4 w-4" /> Requests
                  </button>

                  <button
                    onClick={() => deletePet(pet._id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-white/5 py-24 text-center">
          <ListChecks className="mx-auto mb-4 h-12 w-12 text-gray-700" />
          <p className="text-gray-500">You haven't listed any pets yet.</p>
          <Link
            to="/dashboard/add-pet"
            className="mt-4 inline-block rounded-xl bg-brand px-8 py-3 font-bold text-white"
          >
            Add your first pet
          </Link>
        </div>
      )}

      {showRequestsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-card-dark p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Requests for {selectedPet?.name}
              </h2>
              <button onClick={() => setShowRequestsModal(false)}>
                <X />
              </button>
            </div>

            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <p className="font-bold">{req.userName}</p>
                    <p className="text-sm text-slate-400">{req.userEmail}</p>
                    <p className="mt-2 text-sm text-brand">
                      Pickup: {req.pickupDate}
                    </p>
                    <p className="mt-2 text-sm italic text-slate-400">
                      "{req.message}"
                    </p>

                    {req.status === "pending" ? (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleRequestAction(req._id, "approved")}
                          className="rounded-lg bg-green-500 px-4 py-2 text-xs font-bold text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestAction(req._id, "rejected")}
                          className="rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm font-bold capitalize text-orange-400">
                        {req.status}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-10 text-center text-slate-500">
                No requests for this pet yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="flex min-w-[120px] items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
      <Icon className="h-5 w-5 text-brand" />
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}