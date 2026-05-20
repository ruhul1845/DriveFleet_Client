"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CarCard from "./CarCard";
import Loading from "./Loading";
import { apiFetch } from "@/lib/api";
export default function HomeCars() {
  const [cars,setCars]=useState([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{apiFetch("/api/cars?limit=6").then(d=>setCars(d.cars||[])).finally(()=>setLoading(false));},[]);
  return <section className="container-page mt-20"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h2 className="section-title">Available Cars</h2><p className="mt-2 text-slate-600">Live vehicles loaded from MongoDB database.</p></div><Link className="btn-outline" href="/explore-cars">See All Cars</Link></div>{loading?<Loading/>:<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{cars.map(car=><CarCard key={car._id} car={car}/>)}</div>}</section>;
}
