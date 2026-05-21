import Link from "next/link";
import { MapPin, Users, BadgeDollarSign } from "lucide-react";

export default function CarCard({ car, ownerActions, onEdit, onDelete }) {
  const name = car.name || car.carName || "Unnamed Car";
  const image =
    car.image ||
    car.imageUrl ||
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80";
  const type = car.type || car.carType || "Car";
  const price = car.price || car.dailyRentPrice || 0;
  const seats = car.seats || car.seatCapacity || 0;
  const location = car.location || car.pickupLocation || "No location";
  const available =
    typeof car.available === "boolean"
      ? car.available
      : car.availabilityStatus !== "Unavailable";

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-bold ${available
              ? "bg-green-100/95 text-green-700"
              : "bg-red-100/95 text-red-700"
            }`}
        >
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black">{name}</h3>
            <p className="font-semibold text-amber-600">{type}</p>
          </div>

          <p className="rounded-2xl bg-amber-100 px-3 py-2 font-black text-amber-800">
            ৳{price}/day
          </p>
        </div>

        <p className="mt-3 line-clamp-2 text-slate-600">
          {car.description || "No description available."}
        </p>

        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
          <span className="flex items-center gap-2">
            <Users size={17} /> {seats} Seats
          </span>

          <span className="flex items-center gap-2">
            <MapPin size={17} /> {location}
          </span>

          <span className="flex items-center gap-2">
            <BadgeDollarSign size={17} /> Bookings: {car.booking_count || 0}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link href={`/cars/${car._id}`} className="btn-primary flex-1">
            View Details
          </Link>

          {ownerActions && (
            <>
              <button onClick={() => onEdit(car)} className="btn-outline">
                Update
              </button>

              <button
                onClick={() => onDelete(car)}
                className="btn-outline !text-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}