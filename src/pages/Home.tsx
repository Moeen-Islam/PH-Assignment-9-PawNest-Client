import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PetCard from "@/src/components/PetCard";
import { motion } from "motion/react";
import {
  ArrowRight,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import HomeStaticSections from "../components/home/HomeStaticSections";

export default function Home() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pets?limit=6");

        if (!res.ok) {
          throw new Error("Failed to fetch featured pets");
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

    fetchPets();
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center pt-16">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="w-full space-y-8 md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand"
            >
              <HeartPulse className="h-4 w-4" /> Trusted pet adoption platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl"
            >
              Find a loyal friend. Give a pet a{" "}
              <span className="text-brand">loving home.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-lg text-lg leading-relaxed text-gray-400"
            >
              Browse verified pets, submit adoption requests, and manage
              listings from one clean dashboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/pets"
                className="group flex items-center gap-2 rounded-2xl bg-brand px-10 py-5 font-bold text-white shadow-xl shadow-brand/20 transition-all hover:bg-brand-hover"
              >
                Adopt Now{" "}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/pets"
                className="rounded-2xl border border-white/10 bg-white/5 px-10 py-5 font-bold transition-all hover:bg-white/10"
              >
                Browse All
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative w-full md:w-1/2"
          >
            <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl shadow-brand/10">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200"
                alt="Happy pet"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div className="space-y-4">
            <h2 className="font-display text-4xl font-bold">Featured Pets</h2>
            <div className="h-1 w-20 rounded-full bg-brand" />
          </div>

          <Link
            to="/pets"
            className="flex items-center gap-2 text-sm font-bold text-brand hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <PetCard key={pet._id || pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-white/5 py-20 text-center">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-gray-700" />
            <p className="text-gray-500">
              No pets listed yet. Be the first to add one!
            </p>

            <Link
              to="/dashboard/add-pet"
              className="mt-4 inline-block font-bold text-brand"
            >
              Add a listing
            </Link>
          </div>
        )}
      </section>

      {/* Static Home Sections */}
      <HomeStaticSections />
    </div>
  );
}