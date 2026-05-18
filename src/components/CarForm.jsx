"use client";
import { useState } from "react";

const initial = { name: "", price: "", type: "SUV", image: "", seats: "", location: "", description: "", available: true };
export default function CarForm({ defaultValue, onSubmit, buttonText="Save Car" }) {
  const [form, setForm] = useState(defaultValue || initial);
  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  return <form onSubmit={(e)=>{e.preventDefault(); onSubmit({...form, price:Number(form.price), seats:Number(form.seats)});}} className="card grid gap-4 p-6 md:grid-cols-2">
    <div><label className="label">Car Name</label><input required name="name" className="input" value={form.name} onChange={change}/></div>
    <div><label className="label">Daily Rent Price</label><input required name="price" type="number" min="1" className="input" value={form.price} onChange={change}/></div>
    <div><label className="label">Car Type</label><select name="type" className="input" value={form.type} onChange={change}>{["SUV","Sedan","Hatchback","Luxury","Microbus","Electric"].map(t=><option key={t}>{t}</option>)}</select></div>
    <div><label className="label">Image URL</label><input required name="image" className="input" value={form.image} onChange={change}/></div>
    <div><label className="label">Seat Capacity</label><input required name="seats" type="number" min="1" className="input" value={form.seats} onChange={change}/></div>
    <div><label className="label">Pickup Location</label><input required name="location" className="input" value={form.location} onChange={change}/></div>
    <div className="md:col-span-2"><label className="label">Description</label><textarea required name="description" className="input min-h-32" value={form.description} onChange={change}/></div>
    <label className="flex items-center gap-3 font-bold"><input type="checkbox" name="available" checked={!!form.available} onChange={change}/> Availability Status</label>
    <div className="md:col-span-2"><button className="btn-primary">{buttonText}</button></div>
  </form>;
}
