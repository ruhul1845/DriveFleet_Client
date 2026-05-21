import Link from "next/link";
import HomeCars from "@/components/HomeCars";
import { ShieldCheck, Clock3, MapPinCheck } from "lucide-react";

export default function Home() {
  const features = [
    [
      ShieldCheck,
      "Verified Fleet",
      "Each listing includes owner details, car information, availability status, and a protected booking process.",
    ],
    [
      Clock3,
      "Quick Reservation",
      "Users can view details, check availability, and book a car quickly with driver request and special notes.",
    ],
    [
      MapPinCheck,
      "Easy Pickup Planning",
      "Every car includes pickup location, seat capacity, daily rent, and availability so users can plan trips easily.",
    ],
  ];

  return (
    <>
      <section className="bg-[radial-gradient(circle_at_top_right,#fde68a,transparent_35%),linear-gradient(135deg,#0f172a,#1e293b)] py-20 text-white">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-black uppercase tracking-[.25em] text-amber-300">
              Premium Car Rental
            </p>

            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Rent the right car for every journey.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-200">
              DriveFleet helps users explore cars, book vehicles, manage listings,
              and track bookings from a clean full-stack platform.
            </p>

            <Link href="/explore-cars" className="btn-primary mt-8">
              Explore Cars
            </Link>
          </div>

          <div className=" borderborder-slate-700">
            <img
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
              src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80"
              alt="DriveFleet hero car"
            />
          </div>
        </div>
      </section>

      <div className="py-20">
        <HomeCars />
      </div>
      <div className="flex flex-col gap-20">
        <div className="container-page mb-28 grid gap-6 md:grid-cols-3">
          {features.map(([Icon, title, text]) => (
            <div className="card p-7" key={title}>
              <Icon className="h-10 w-10 text-amber-500" />

              <h3 className="mt-4 text-2xl font-black">{title}</h3>

              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="container-page mt-32 mb-32 overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="section-title !text-white">
                List your car and manage rentals easily.
              </h2>

              <p className="mt-4 text-slate-300">
                Add your vehicle with rent price, image, location, seat capacity,
                description, and availability status. You can update or delete your
                listing anytime from My Added Cars.
              </p>

              <Link href="/add-car" className="btn-primary mt-6">
                Add Your Car
              </Link>
            </div>

            <img
              className="h-80 w-full rounded-[1.5rem] object-cover"
              src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80"
              alt="Car rental listing"
            />
          </div>
        </div>

      </div>
    </>
  );
}