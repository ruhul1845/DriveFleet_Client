import BookNowButton from "@/components/BookNowButton";
import { serverApiFetch } from "@/lib/server-api";

export default async function CarDetails({ params }) {
    const { id } = await params;

    let car = null;

    try {
        const data = await serverApiFetch(`/api/cars/${id}`);
        car = data.car;
    } catch (error) {
        console.error("CAR DETAILS SERVER FETCH ERROR:", error);
    }

    if (!car) {
        return (
            <section className="container-page py-20">
                <h1 className="section-title">Car not found</h1>
            </section>
        );
    }

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
        <section className="container-page py-12">
            <div className="grid gap-8 lg:grid-cols-2">
                <img
                    className="h-[520px] w-full rounded-[2rem] object-cover shadow-xl"
                    src={image}
                    alt={name}
                />

                <div className="card p-7">
                    <p className="font-black uppercase tracking-[.2em] text-amber-600">
                        {type}
                    </p>

                    <h1 className="mt-2 text-4xl font-black">{name}</h1>

                    <p className="mt-4 text-lg text-slate-600">{car.description}</p>

                    <div className="mt-6 grid gap-3 rounded-3xl bg-slate-50 p-5 font-bold">
                        <p>Daily Rent: ৳{price}</p>
                        <p>Seats: {seats}</p>
                        <p>Pickup Location: {location}</p>
                        <p>Status: {available ? "Available" : "Unavailable"}</p>
                        <p>Total Bookings: {car.booking_count || 0}</p>
                        <p>Owner: {car.ownerName || car.ownerEmail}</p>
                    </div>

                    <BookNowButton car={{ ...car, available }} carId={id} />
                </div>
            </div>
        </section>
    );
}