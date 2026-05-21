import Link from "next/link";
import CarPublicCard from "@/components/CarPublicCard";
import { serverApiFetch } from "@/lib/server-api";

export default async function HomeCars() {
  let cars = [];

  try {
    const data = await serverApiFetch("/api/cars?limit=6");
    cars = data.cars || [];
  } catch (error) {
    console.error("HOME CARS SERVER FETCH ERROR:", error);
  }

  return (
    <section className="container-page mt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Available Cars</h2>
          <p className="mt-2 text-slate-600">
            Live vehicles loaded from MongoDB database.
          </p>
        </div>

        <Link className="btn-outline" href="/explore-cars">
          See All Cars
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="card p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-800">No cars found</h3>
          <p className="mt-2 text-slate-600">
            Please seed your database or add new cars.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarPublicCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}