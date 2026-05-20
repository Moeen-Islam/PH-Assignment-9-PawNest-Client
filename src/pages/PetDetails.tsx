import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  DollarSign,
  Heart,
  Mail,
  MapPin,
  PawPrint,
  ShieldCheck,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/src/contexts/AuthContext";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    pickupDate: "",
    message: "",
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pets/${id}`);

        if (!res.ok) {
          toast.error("Pet not found");
          navigate("/pets");
          return;
        }

        const data = await res.json();
        setPet(data);
      } catch {
        toast.error("Failed to load pet details");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id, navigate]);

  const isOwner = user?.email && pet?.ownerEmail === user.email;

  const handleSubmitAdoption = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to adopt");
      navigate("/login", { state: { from: `/pets/${id}` } });
      return;
    }

    if (isOwner) {
      toast.error("You cannot adopt your own pet");
      return;
    }

    if (!pet) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          petId: pet._id,
          petName: pet.name,
          petImageUrl: pet.imageUrl,
          userName: user.displayName || "User",
          userEmail: user.email,
          ownerEmail: pet.ownerEmail,
          pickupDate: formData.pickupDate,
          message: formData.message,
          status: "pending",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to submit request");
        return;
      }

      toast.success("Adoption request submitted successfully");
      setRequestSubmitted(true);
      setFormData({ pickupDate: "", message: "" });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050814]">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="min-h-screen bg-[#050814] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate("/pets")}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Pets
        </button>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <img
                src={pet.imageUrl || pet.image}
                alt={pet.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=80";
                }}
                className="h-[360px] w-full object-cover"
              />

              <span className="absolute right-5 top-5 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold uppercase text-white">
                {pet.status || "available"}
              </span>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <h1 className="text-5xl font-black">{pet.name}</h1>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-400">
                    {pet.species}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                    {pet.breed}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                    {pet.gender}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-slate-400">Adoption Fee</p>
                <p className="text-4xl font-black text-orange-500">
                  ৳{pet.adoptionFee}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={PawPrint} label="Species" value={pet.species} />
              <InfoCard icon={Activity} label="Breed" value={pet.breed} />
              <InfoCard icon={Calendar} label="Age" value={`${pet.age} years`} />
              <InfoCard icon={User} label="Gender" value={pet.gender} />
              <InfoCard icon={MapPin} label="Location" value={pet.location} />
              <InfoCard
                icon={DollarSign}
                label="Adoption Fee"
                value={`৳${pet.adoptionFee}`}
              />
              <InfoCard
                icon={Heart}
                label="Health Status"
                value={pet.healthStatus}
              />
              <InfoCard
                icon={ShieldCheck}
                label="Vaccinated"
                value={pet.vaccinationStatus}
              />
            </div>

            <div className="mt-8">
              <h2 className="mb-3 text-2xl font-bold">About {pet.name}</h2>
              <p className="max-w-3xl leading-8 text-slate-400">
                {pet.description}
              </p>
            </div>

            {isOwner && (
              <div className="mt-8 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
                <p className="font-bold text-orange-400">
                  You own this listing
                </p>
                <Link
                  to={`/dashboard/update-pet/${pet._id}`}
                  className="mt-3 inline-block rounded-xl bg-white/10 px-5 py-2 text-sm font-bold hover:bg-white/15"
                >
                  Edit Pet
                </Link>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            {isOwner ? (
              <div className="rounded-3xl border border-blue-500/20 bg-[#0B1324] p-10 text-center shadow-2xl shadow-blue-500/10">
                <AlertTriangle className="mx-auto mb-5 h-14 w-14 text-yellow-400" />
                <h2 className="text-2xl font-black">This is your listing</h2>
                <p className="mt-3 text-slate-400">
                  You cannot request adoption for your own pet.
                </p>
              </div>
            ) : requestSubmitted ? (
              <div className="rounded-3xl border border-emerald-500/20 bg-[#0B1324] p-10 text-center shadow-2xl shadow-emerald-500/10">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10">
                  <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                </div>

                <h2 className="text-2xl font-black text-white">
                  Request Submitted!
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                  Your adoption request for {pet.name} has been sent to the
                  owner. You can track its status in My Requests.
                </p>

                <Link
                  to="/dashboard/my-requests"
                  className="mt-6 inline-flex rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                >
                  View My Requests
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitAdoption}
                className="rounded-3xl border border-blue-500/20 bg-[#0B1324] p-6 shadow-2xl shadow-blue-500/10"
              >
                <div className="mb-6">
                  <h2 className="flex items-center gap-2 text-2xl font-black">
                    <Heart className="h-6 w-6 text-pink-400" />
                    Request to Adopt {pet.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Fill out this form and the owner will review your request.
                  </p>
                </div>

                <div className="space-y-4">
                  <FormInput label="Pet Name" value={pet.name} readOnly />

                  <FormInput
                    label="Your Name"
                    value={user?.displayName || ""}
                    readOnly
                    icon={<User className="h-4 w-4" />}
                  />

                  <FormInput
                    label="Your Email"
                    value={user?.email || ""}
                    readOnly
                    icon={<Mail className="h-4 w-4" />}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-300">
                      Preferred Pickup Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.pickupDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pickupDate: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#111A2E] px-4 py-3 text-white outline-none transition focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-300">
                      Message to Owner
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={`Tell the owner why you'd be a great match for ${pet.name}...`}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="w-full resize-none rounded-2xl border border-white/10 bg-[#111A2E] px-4 py-3 text-white outline-none transition focus:border-orange-500"
                    />
                  </div>

                  <button
                    disabled={isSubmitting || pet.status === "adopted"}
                    className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-orange-500 to-cyan-400 px-6 py-4 font-black text-white shadow-xl shadow-orange-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : `Adopt ${pet.name} 🐾`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-pink-500" />
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="font-bold text-white">{value || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  value,
  readOnly,
  icon,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-300">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          value={value}
          readOnly={readOnly}
          className={`w-full rounded-2xl border border-white/10 bg-[#111A2E] py-3 text-white outline-none ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}