import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050814] text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold">PawNest</span>
          </Link>

          <p className="max-w-xs leading-7">
            Connecting loving families with pets in need. Every adoption saves a
            life and creates a beautiful bond.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-orange-500"
              href="#"
            >
              <Facebook size={16} />
            </a>
            <a
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-orange-500"
              href="#"
            >
              <Twitter size={16} />
            </a>
            <a
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-orange-500"
              href="#"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Platform</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/pets" className="hover:text-orange-400">
                All Pets
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-pet" className="hover:text-orange-400">
                Add a Pet
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-requests"
                className="hover:text-orange-400"
              >
                My Requests
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-listings"
                className="hover:text-orange-400"
              >
                My Listings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Company</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/#success-stories" className="hover:text-orange-400">
                Success Stories
              </Link>
            </li>
            <li>
              <Link to="/#pet-care-tips" className="hover:text-orange-400">
                Pet Care Tips
              </Link>
            </li>
            <li>
              <Link to="/#why-adopt" className="hover:text-orange-400">
                Why Adopt?
              </Link>
            </li>
            <li>
              <Link to="/#adoption-process" className="hover:text-orange-400">
                Adoption Process
              </Link>
            </li>
            <li>
              <Link to="/#shelter-support" className="hover:text-orange-400">
                Shelter Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Contact</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin size={18} className="text-orange-500" /> Dhaka, Bangladesh
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-orange-500" /> +880 1303-218089
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-orange-500" />{" "}
              moeenislam8089@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-white/10 px-6 py-5 text-sm text-slate-500">
        © 2026 PawNest. All rights reserved.
      </div>
    </footer>
  );
}
