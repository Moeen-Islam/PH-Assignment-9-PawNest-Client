import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Image as ImageIcon,
  MapPin,
  Tag,
  Dumbbell,
  Stethoscope,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/src/contexts/AuthContext";

export default function AddPet() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    imageUrl: "",
    healthStatus: "Healthy",
    vaccinationStatus: "Vaccinated",
    location: "",
    adoptionFee: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          adoptionFee: Number(formData.adoptionFee),
          ownerEmail: user.email,
          ownerName: user.name || user.displayName || user.email,
          ownerPhoto: user.photoURL || "",
          status: "available",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to add pet");
        return;
      }

      toast.success("Pet listing added successfully!");
      navigate("/dashboard/my-listings");
    } catch (err: any) {
      toast.error(err.message || "Failed to add pet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-card-dark p-8 md:p-10">
      <div className="mb-8 flex items-center gap-3">
        <PlusCircle className="h-8 w-8 text-brand" />
        <h1 className="font-display text-3xl font-bold">Add a New Pet</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Pet Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Species
            </label>
            <select
              value={formData.species}
              onChange={(e) =>
                setFormData({ ...formData, species: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none text-white appearance-none transition-colors focus:border-brand"
            >
              <option className="bg-card-dark text-white" value="Dog">Dog</option>
              <option className="bg-card-dark text-white" value="Cat">Cat</option>
              <option className="bg-card-dark text-white" value="Bird">Bird</option>
              <option className="bg-card-dark text-white" value="Rabbit">Rabbit</option>
              <option className="bg-card-dark text-white" value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Breed
            </label>
            <input
              type="text"
              required
              value={formData.breed}
              onChange={(e) =>
                setFormData({ ...formData, breed: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Age Years
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none text-white appearance-none transition-colors focus:border-brand"
              >
                <option className="bg-card-dark text-white" value="Male">Male</option>
                <option className="bg-card-dark text-white" value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <ImageIcon className="h-3 w-3" /> Image URL
            </label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <MapPin className="h-3 w-3" /> Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <Tag className="h-3 w-3" /> Adoption Fee
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.adoptionFee}
              onChange={(e) =>
                setFormData({ ...formData, adoptionFee: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <Dumbbell className="h-3 w-3" /> Health Status
            </label>
            <input
              type="text"
              required
              value={formData.healthStatus}
              onChange={(e) =>
                setFormData({ ...formData, healthStatus: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <Stethoscope className="h-3 w-3" /> Vaccination
            </label>
            <input
              type="text"
              required
              value={formData.vaccinationStatus}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vaccinationStatus: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Description
          </label>
          <textarea
            required
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center">
          <div className="text-sm">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Listing Owner
            </p>
            <p className="font-semibold">{user?.email} Read Only</p>
          </div>

          <button
            disabled={isLoading}
            className="rounded-xl bg-brand px-10 py-4 font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-hover disabled:opacity-50"
          >
            {isLoading ? "Creating Listing..." : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}