import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 py-12 text-white">
      <div className="container-page grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-black text-amber-400">DriveFleet</h3>
          <p className="mt-3 text-slate-300">
            Modern rentals for weekend drives, office trips, family tours, and premium city movement.
          </p>
          <div className="mt-5 flex gap-3">
            <FaFacebook />
            <FaLinkedinIn />
            <FaXTwitter />

          </div>
        </div>
        <div>
          <h4 className="font-bold">Useful Links</h4>
          <div className="mt-3 grid gap-2 text-slate-300">
            <Link href="/explore-cars">Explore Cars</Link>
            <Link href="/add-car">Add Car</Link>
            <Link href="/my-bookings">My Bookings</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold">Contact Information</h4>
          <p className="mt-3 text-slate-300">
            Dhaka, Bangladesh<br />support@drivefleet.com<br />+880 1834340813
          </p>
        </div>
      </div>
    </footer>
  );
}
