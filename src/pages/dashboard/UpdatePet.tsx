import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  Edit3,
  Image as ImageIcon,
  MapPin,
  Tag,
  Dumbbell,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

export default function UpdatePet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    imageUrl: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
  });

  useEffect(() => {
    const fetchPet = async () => {
      if (!id || !user?.email) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          toast.error("Pet not found");
          navigate("/dashboard/my-listings");
          return;
        }

        const data = await res.json();

        if (data.ownerEmail !== user.email) {
          toast.error("Unauthorized");
          navigate("/dashboard/my-listings");
          return;
        }

        setFormData({
          name: data.name || "",
          species: data.species || "Dog",
          breed: data.breed || "",
          age: String(data.age || ""),
          gender: data.gender || "Male",
          imageUrl: data.imageUrl || "",
          healthStatus: data.healthStatus || "",
          vaccinationStatus: data.vaccinationStatus || "",
          location: data.location || "",
          adoptionFee: String(data.adoptionFee || ""),
          description: data.description || "",
        });
      } catch {
        toast.error("Failed to load pet");
      } finally {
        setFetching(false);
      }
    };

    fetchPet();
  }, [id, user?.email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/pets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          adoptionFee: Number(formData.adoptionFee),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update");
        return;
      }

      toast.success("Pet listing updated!");
      navigate("/dashboard/my-listings");
    } catch {
      toast.error("Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetching) {
    return <div className="h-96 animate-pulse rounded-3xl bg-white/5" />;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-card-dark p-8 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Go back
      </button>

      <div className="mb-8 flex items-center gap-3">
        <Edit3 className="h-8 w-8 text-brand" />
        <h1 className="font-display text-3xl font-bold">Update Listing</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input label="Pet Name" value={formData.name} onChange={(value) => setFormData({ ...formData, name: value })} />

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Species
            </label>
            <select
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Input label="Breed" value={formData.breed} onChange={(value) => setFormData({ ...formData, breed: value })} />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age Years"
              type="number"
              value={formData.age}
              onChange={(value) => setFormData({ ...formData, age: value })}
            />

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Image URL"
            icon={<ImageIcon className="h-3 w-3" />}
            type="url"
            value={formData.imageUrl}
            onChange={(value) => setFormData({ ...formData, imageUrl: value })}
          />

          <Input
            label="Location"
            icon={<MapPin className="h-3 w-3" />}
            value={formData.location}
            onChange={(value) => setFormData({ ...formData, location: value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Input
            label="Adoption Fee"
            icon={<Tag className="h-3 w-3" />}
            type="number"
            value={formData.adoptionFee}
            onChange={(value) => setFormData({ ...formData, adoptionFee: value })}
          />

          <Input
            label="Health Status"
            icon={<Dumbbell className="h-3 w-3" />}
            value={formData.healthStatus}
            onChange={(value) => setFormData({ ...formData, healthStatus: value })}
          />

          <Input
            label="Vaccination"
            icon={<Stethoscope className="h-3 w-3" />}
            value={formData.vaccinationStatus}
            onChange={(value) =>
              setFormData({ ...formData, vaccinationStatus: value })
            }
          />
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

        <button
          disabled={isLoading}
          className="w-full rounded-2xl bg-brand py-5 font-bold text-white shadow-xl shadow-brand/20 transition-all hover:bg-brand-hover disabled:opacity-50"
        >
          {isLoading ? "Saving Changes..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
        {icon} {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-brand"
      />
    </div>
  );
}