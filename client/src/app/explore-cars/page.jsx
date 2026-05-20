"use client";
import { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import Loading from "@/components/Loading";
import { apiFetch } from "@/lib/api";
export default function ExploreCars() {
  const [cars,setCars]=useState([]),[loading,setLoading]=useState(true),[search,setSearch]=useState(""),[type,setType]=useState("");
  const load=()=>{setLoading(true); apiFetch(`/api/cars?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}`).then(d=>setCars(d.cars||[])).finally(()=>setLoading(false));};
  useEffect(()=>{load();},[]);
  return <section className="container-page py-12"><h1 className="section-title">Explore Cars</h1><p className="mt-2 text-slate-600">Search by car name and filter by type. Unavailable cars are also visible.</p><div className="card my-8 grid gap-4 p-4 md:grid-cols-[1fr_220px_auto]"><input className="input" placeholder="Search car name" value={search} onChange={e=>setSearch(e.target.value)}/><select className="input" value={type} onChange={e=>setType(e.target.value)}><option value="">All Types</option>{["SUV","Sedan","Hatchback","Luxury","Microbus","Electric"].map(t=><option key={t}>{t}</option>)}</select><button className="btn-primary" onClick={load}>Search</button></div>{loading?<Loading/>:<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{cars.map(car=><CarCard key={car._id} car={car}/>)}</div>}</section>;
}
