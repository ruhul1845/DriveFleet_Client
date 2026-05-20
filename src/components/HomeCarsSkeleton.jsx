import Link from "next/link";

export default function HomeCarsSkeleton() {
  return (
    <section className="container-page mt-20" aria-busy="true" aria-label="Loading cars">
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
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="card overflow-hidden">
            <div className="h-52 animate-pulse bg-slate-200" />
            <div className="space-y-3 p-5">
              <div className="h-6 w-2/3 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-4 w-1/3 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-10 animate-pulse rounded-2xl bg-amber-100" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
