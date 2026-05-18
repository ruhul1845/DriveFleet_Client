import Image from "next/image";
import Link from "next/link";
import HomeCars from "@/components/HomeCars";
import { ShieldCheck, Clock3, Sparkles } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80";
const OWNER_IMAGE =
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80";

export default function Home() {
  return (
    <>
      <section className="bg-[radial-gradient(circle_at_top_right,#fde68a,transparent_35%),linear-gradient(135deg,#0f172a,#1e293b)] py-20 text-white">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-black uppercase tracking-[.25em] text-amber-300">Premium Car Rental</p>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">Rent the right car for every journey.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200">
              DriveFleet helps users explore cars, book vehicles, manage listings, and track bookings from a clean full-stack platform.
            </p>
            <Link href="/explore-cars" className="btn-primary mt-8">Explore Cars</Link>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="relative h-[420px] w-full overflow-hidden rounded-[1.5rem]">
              <Image
                src={HERO_IMAGE}
                alt="DriveFleet hero car"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <HomeCars />
      <section className="container-page mt-20 grid gap-6 md:grid-cols-3">
        {[
          [ShieldCheck, "Verified Fleet", "Every listing includes owner details and protected booking flow."],
          [Clock3, "Fast Booking", "Book available cars in minutes with driver request and notes."],
          [Sparkles, "Recruiter Friendly UI", "Responsive layout, equal cards, consistent typography, and modern spacing."]
        ].map(([Icon, title, text]) => (
          <div className="card p-7" key={title}>
            <Icon className="h-10 w-10 text-amber-500" />
            <h3 className="mt-4 text-2xl font-black">{title}</h3>
            <p className="mt-2 text-slate-600">{text}</p>
          </div>
        ))}
      </section>
      <section className="container-page mt-20 overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="section-title !text-white">Own a car? Start earning from it.</h2>
            <p className="mt-4 text-slate-300">
              Add your car with rent, location, seats, images, and availability. Update or delete your listing anytime from My Added Cars.
            </p>
            <Link href="/add-car" className="btn-primary mt-6">Add Your Car</Link>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-[1.5rem]">
            <Image
              src={OWNER_IMAGE}
              alt="Car owner"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
