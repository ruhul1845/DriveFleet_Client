import Link from "next/link";

export default function CarPublicCard({ car }) {
    const name = car.name || car.carName;
    const image = car.image || car.imageUrl;
    const type = car.type || car.carType;
    const price = car.price || car.dailyRentPrice;
    const seats = car.seats || car.seatCapacity;
    const location = car.location || car.pickupLocation;
    const available =
        typeof car.available === "boolean"
            ? car.available
            : car.availabilityStatus !== "Unavailable";

    return (
        <article className="card overflow-hidden">
            <img
                src={image}
                alt={name}
                loading="lazy"
                className="h-56 w-full object-cover"
            />

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-black text-slate-900">{name}</h3>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${available
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {available ? "Available" : "Unavailable"}
                    </span>
                </div>

                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-600">
                    {type}
                </p>

                <p className="mt-3 line-clamp-2 text-slate-600">{car.description}</p>

                <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                    <p>Daily Rent: ৳{price}</p>
                    <p>Seats: {seats}</p>
                    <p>Pickup: {location}</p>
                </div>

                <Link
                    href={`/cars/${car._id}`}
                    className="btn-primary mt-5 inline-flex w-full justify-center"
                >
                    View Details
                </Link>
            </div>
        </article>
    );
}