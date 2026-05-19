import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, BadgeDollarSign } from "lucide-react";
import { DEFAULT_CAR_IMAGE } from "@/lib/images";

export default function CarCard({ car, ownerActions, onEdit, onDelete }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={car.image || DEFAULT_CAR_IMAGE}
          alt={car.name}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 hover:scale-105"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-slate-900">
          {car.available ? "Available" : "Unavailable"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black">{car.name}</h3>
            <p className="font-semibold text-amber-600">{car.type}</p>
          </div>
          <p className="rounded-2xl bg-amber-100 px-3 py-2 font-black text-amber-800">৳{car.price}/day</p>
        </div>
        <p className="mt-3 line-clamp-2 text-slate-600">{car.description}</p>
        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
          <span className="flex items-center gap-2"><Users size={17} /> {car.seats} Seats</span>
          <span className="flex items-center gap-2"><MapPin size={17} /> {car.location}</span>
          <span className="flex items-center gap-2"><BadgeDollarSign size={17} /> Bookings: {car.booking_count || 0}</span>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link href={`/cars/${car._id}`} className="btn-primary flex-1">View Details</Link>
          {ownerActions && (
            <>
              <button onClick={() => onEdit(car)} className="btn-outline">Update</button>
              <button onClick={() => onDelete(car)} className="btn-outline !text-red-600">Delete</button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
