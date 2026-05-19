"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CarCard from "./CarCard";
import HomeCarsSkeleton from "./HomeCarsSkeleton";
import { getFeaturedCars } from "@/lib/api";

export default function HomeCars() {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCars() {
      try {
        const list = await getFeaturedCars();
        if (!cancelled) setCars(list);
      } catch {
        if (!cancelled) setCars([]);
      }
    }

    loadCars();
    return () => {
      cancelled = true;
    };
  }, []);

  if (cars === null) return <HomeCarsSkeleton />;

  return (
    <section className="container-page mt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Available Cars</h2>
          <p className="mt-2 text-slate-600">Live vehicles loaded from MongoDB database.</p>
        </div>
        <Link className="btn-outline" href="/explore-cars">
          See All Cars
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}
