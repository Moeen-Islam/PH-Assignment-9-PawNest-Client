import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import PetCard from "@/src/components/PetCard";
import { motion } from "motion/react";
import { ArrowRight, HeartPulse, ShieldCheck, Handshake, Info, Sparkles } from "lucide-react";

export default function Home() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const q = query(collection(db, "pets"), limit(6));
        const snapshot = await getDocs(q);
        let petsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Auto-seed if empty and no manual block
        if (petsData.length === 0) {
          const initialPets = [
            {"name":"Luna","species":"Dog","breed":"Golden Retriever","age":2,"gender":"Female","imageUrl":"https://images.unsplash.com/photo-1552053831-71594a27632d","healthStatus":"Healthy","vaccinationStatus":"Fully Vaccinated","location":"Dhaka","adoptionFee":2500,"description":"Luna is playful, gentle, and loves children.","status":"available"},
            {"name":"Milo","species":"Cat","breed":"Persian","age":1,"gender":"Male","imageUrl":"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba","healthStatus":"Healthy","vaccinationStatus":"Fully Vaccinated","location":"Chattogram","adoptionFee":1800,"description":"Milo enjoys quiet homes and warm laps.","status":"available"},
            {"name":"Kiwi","species":"Bird","breed":"Budgerigar","age":1,"gender":"Female","imageUrl":"https://images.unsplash.com/photo-1522926193341-e9ffd686c60f","healthStatus":"Healthy","vaccinationStatus":"Not Required","location":"Sylhet","adoptionFee":900,"description":"Kiwi is social, bright, and easy to care for.","status":"available"},
            {"name":"Snowy","species":"Rabbit","breed":"Netherland Dwarf","age":2,"gender":"Male","imageUrl":"https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308","healthStatus":"Healthy","vaccinationStatus":"Partially Vaccinated","location":"Rajshahi","adoptionFee":1200,"description":"Snowy is calm and perfect for apartment living.","status":"available"},
            {"name":"Rocky","species":"Dog","breed":"German Shepherd","age":3,"gender":"Male","imageUrl":"https://images.unsplash.com/photo-1589941013453-ec89f33b5e95","healthStatus":"Healthy","vaccinationStatus":"Fully Vaccinated","location":"Khulna","adoptionFee":3000,"description":"Rocky is loyal, trained, and protective.","status":"available"},
            {"name":"Bella","species":"Cat","breed":"Siamese","age":2,"gender":"Female","imageUrl":"https://images.unsplash.com/photo-1574158622682-e40e69881006","healthStatus":"Healthy","vaccinationStatus":"Fully Vaccinated","location":"Dhaka","adoptionFee":2000,"description":"Bella is curious, affectionate, and tidy.","status":"available"},
            {"name":"Daisy","species":"Dog","breed":"Beagle","age":2,"gender":"Female","imageUrl":"https://images.unsplash.com/photo-1537151608828-ea2b11777ee8","healthStatus":"Healthy","vaccinationStatus":"Fully Vaccinated","location":"Barishal","adoptionFee":2200,"description":"Daisy is a scent hound with a big heart.","status":"available"},
            {"name":"Oliver","species":"Cat","breed":"Tabby","age":3,"gender":"Male","imageUrl":"https://images.unsplash.com/photo-1533738363-b7f9aef128ce","healthStatus":"Healthy","vaccinationStatus":"Fully Vaccinated","location":"Dhaka","adoptionFee":1500,"description":"Oliver is a quiet observer who loves sunny spots.","status":"available"},
            {"name":"Pip","species":"Other","breed":"Hamster","age":1,"gender":"Male","imageUrl":"https://images.unsplash.com/photo-1548767797-d933be75e1f0","healthStatus":"Healthy","vaccinationStatus":"Not Required","location":"Gazipur","adoptionFee":500,"description":"Pip is tiny, energetic, and loves his wheel.","status":"available"},
            {"name":"Shadow","species":"Dog","breed":"Black Labrador","age":4,"gender":"Male","imageUrl":"https://images.unsplash.com/photo-1552053831-71594a27632d","healthStatus":"Healthy","vaccinationStatus":"Fully Vaccinated","location":"Cumilla","adoptionFee":2800,"description":"Shadow is a loyal companion and excellent swimmer.","status":"available"}
          ];
          
          const { addDoc, serverTimestamp } = await import("firebase/firestore");
          
          try {
            await Promise.all(initialPets.map(pet => 
              addDoc(collection(db, "pets"), {
                ...pet,
                ownerEmail: "system@pawnest.org",
                createdAt: serverTimestamp()
              })
            ));
            
            // Refresh
            const updatedSnapshot = await getDocs(query(collection(db, "pets"), limit(10)));
            petsData = updatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          } catch (seedErr) {
            console.error("Seeding failed:", seedErr);
          }
        }

        setPets(petsData);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest"
            >
              <HeartPulse className="w-4 h-4" /> Trusted pet adoption platform
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-bold leading-[0.95] tracking-tight"
            >
              Find a loyal friend. Give a pet a <span className="text-brand">loving home.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 max-w-lg leading-relaxed"
            >
              Browse verified pets, submit adoption requests, and manage listings from one clean dashboard.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/pets" className="px-10 py-5 bg-brand hover:bg-brand-hover text-white rounded-2xl font-bold flex items-center gap-2 group transition-all shadow-xl shadow-brand/20">
                Adopt Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/pets" className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
                Browse All
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl shadow-brand/10">
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200" 
                alt="Happy pet" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold">Featured Pets</h2>
            <div className="h-1 w-20 bg-brand rounded-full"></div>
          </div>
          <Link to="/pets" className="text-sm font-bold text-brand hover:underline flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <Sparkles className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No pets listed yet. Be the first to add one!</p>
            <Link to="/dashboard/add-pet" className="mt-4 inline-block text-brand font-bold">Add a listing</Link>
          </div>
        )}
      </section>

      {/* Info Sections */}
      <section className="bg-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand/20 rounded-2xl flex items-center justify-center text-brand">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display">Why Adopt Pets</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Adoption saves lives, reduces shelter pressure, and gives abandoned animals a second chance at happiness with a loving family.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display">Success Stories</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Thousands of families have found their perfect companions through PawNest. Read about our safe and verified adoption journeys.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display">Pet Care Tips</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                New to pet ownership? We provide resources on nutrition, training, and veterinary checkups to ensure your pet thrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Static Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 bg-card-dark border border-white/10 rounded-[2.5rem] flex flex-col justify-center gap-6">
            <div className="w-14 h-14 bg-brand/10 border border-brand/20 rounded-full flex items-center justify-center text-brand">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-display font-bold">Shelter Partner Program</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              We work directly with animal shelters across the country to publish verified listings and handle adoption requests faster and more securely.
            </p>
            <button className="text-brand font-bold flex items-center gap-2 hover:translate-x-2 transition-transform self-start">
              Learn more about partnerships <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="p-10 bg-card-dark border border-white/10 rounded-[2.5rem] flex flex-col justify-center gap-6">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-display font-bold">Safe Adoption Promise</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Every adoption request is tracked with owner approval, status updates, and adoption control to ensure every pet finds its perfect match.
            </p>
            <button className="text-white bg-white/10 px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all self-start">
              Our vetting process
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
