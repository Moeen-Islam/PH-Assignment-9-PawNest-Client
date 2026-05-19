import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Activity } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface PetCardProps {
  pet: any;
  onQuickView?: (pet: any) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onQuickView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card-dark border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-brand/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={pet.imageUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"} 
          alt={pet.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
          {pet.species}
        </div>
        {pet.status === "adopted" && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="px-6 py-2 bg-white/10 border border-white/30 text-white rounded-full font-bold uppercase tracking-[0.2em] transform -rotate-12">
              Adopted
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-display font-bold text-white group-hover:text-brand transition-colors">{pet.name}</h3>
          <span className="text-brand font-bold text-lg leading-none">${pet.adoptionFee}</span>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <p className="text-sm text-gray-400 line-clamp-2">{pet.description}</p>
          
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Activity className="w-3 h-3 text-brand" />
              <span>{pet.breed}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3 text-brand" />
              <span>{pet.age} years old</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 col-span-2">
              <MapPin className="w-3 h-3 text-brand" />
              <span>{pet.location}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {onQuickView ? (
            <button 
              onClick={() => onQuickView(pet)}
              className="flex-grow py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-center hover:bg-white/10 transition-all"
            >
              Quick View
            </button>
          ) : (
            <Link 
              to={`/pets/${pet.id}`} 
              className="flex-grow py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-center hover:bg-white/10 transition-all"
            >
              View Details
            </Link>
          )}
          
          {pet.status !== "adopted" && (
            <Link 
              to={`/pets/${pet.id}`}
              className="flex-grow py-3 px-4 rounded-xl bg-brand text-white text-xs font-bold text-center hover:bg-brand-hover shadow-lg shadow-brand/20 transition-all"
            >
              Adopt Now
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;
