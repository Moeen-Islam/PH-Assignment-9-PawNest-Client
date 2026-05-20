import { useEffect, useState } from "react";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

const SPECIES_OPTIONS = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

export default function AllPets() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchPets();
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, selectedSpecies, sortBy, sortOrder]);

  const fetchPets = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      if (selectedSpecies.length > 0) {
        params.append("species", selectedSpecies.join(","));
      }

      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);

      const res = await fetch(
        `http://localhost:5000/api/pets?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch pets");
      }

      const data = await res.json();
      setPets(Array.isArray(data) ? data : data.pets || []);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSpecies = (species: string) => {
    setSelectedSpecies((prev) =>
      prev.includes(species)
        ? prev.filter((s) => s !== species)
        : [...prev, species],
    );
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h1 className="text-4xl font-bold">
            Discover Your <span className="text-brand">New Companion</span>
          </h1>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-card-dark py-4 pl-12 pr-4 text-sm transition-colors focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-y border-white/5 py-3">
          <div className="mr-4 flex items-center gap-2 text-sm font-semibold text-gray-400">
            <Filter className="h-4 w-4" /> Filter by Species:
          </div>

          {SPECIES_OPTIONS.map((species) => (
            <button
              key={species}
              onClick={() => toggleSpecies(species)}
              className={cn(
                "rounded-xl border px-4 py-2 text-xs font-bold transition-all",
                selectedSpecies.includes(species)
                  ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20",
              )}
            >
              {species}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <SlidersHorizontal className="h-4 w-4" /> Sort:
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-white/10 bg-card-dark px-3 py-2 text-xs font-bold focus:outline-none"
            >
              <option value="name">Name</option>
              <option value="adoptionFee">Price</option>
              <option value="age">Age</option>
              <option value="createdAt">Newest</option>
            </select>

            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  sortOrder === "asc" && "rotate-180",
                )}
              />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <div
                key={pet._id || pet.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={
                      pet.imageUrl ||
                      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={pet.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {pet.breed} • {pet.species}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold uppercase text-green-400">
                      {pet.status || "available"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-400">
                    <p>
                      <span className="text-white">Age:</span> {pet.age} years
                    </p>
                    <p>
                      <span className="text-white">Fee:</span> ৳
                      {pet.adoptionFee}
                    </p>
                    <p className="col-span-2">
                      <span className="text-white">Location:</span>{" "}
                      {pet.location}
                    </p>
                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-slate-400">
                    {pet.description}
                  </p>

                  <Link
                    to={`/pets/${pet._id || pet.id}`}
                    className="flex w-full items-center justify-center rounded-2xl bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-hover"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 py-24 text-center">
            <Filter className="mx-auto mb-4 h-12 w-12 text-gray-700" />
            <h3 className="mb-2 text-xl font-bold">No pets found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search term.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecies([]);
              }}
              className="mt-6 font-bold text-brand hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
