import CarPublicCard from "@/components/CarPublicCard";
import { serverApiFetch } from "@/lib/server-api";

export default async function ExploreCars({ searchParams }) {
  const params = await searchParams;

  const search = params?.search || "";
  const type = params?.type || "";

  let cars = [];

  try {
    const data = await serverApiFetch(
      `/api/cars?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}`
    );

    cars = data.cars || [];
  } catch (error) {
    console.error("EXPLORE CARS SERVER FETCH ERROR:", error);
  }

  return (
    <section className="container-page py-12">
      <h1 className="section-title">Explore Cars</h1>

      <p className="mt-2 text-slate-600">
        Search by car name and filter by type. Unavailable cars are also visible.
      </p>

      <form
        action="/explore-cars"
        className="card my-8 grid gap-4 p-4 md:grid-cols-[1fr_220px_auto]"
      >
        <input
          className="input"
          name="search"
          placeholder="Search car name"
          defaultValue={search}
        />

        <select className="input" name="type" defaultValue={type}>
          <option value="">All Types</option>
          {["SUV", "Sedan", "Hatchback", "Luxury", "Microbus", "Electric"].map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
        </select>

        <button className="btn-primary" type="submit">
          Search
        </button>
      </form>

      {cars.length === 0 ? (
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800">No cars found</h2>
          <p className="mt-2 text-slate-600">
            Try another search keyword or car type.
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