"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

export default function BookingModal({ car, user, onClose }) {
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/bookings", { method: "POST", body: JSON.stringify({ carId: car._id, driverNeeded, specialNote, userEmail: user.email, userName: user.name }) });
      toast.success("Car booked successfully");
      onClose(true);
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/60 p-4">
    <form onSubmit={submit} className="card w-full max-w-lg p-6">
      <h2 className="text-2xl font-black">Book {car.name}</h2>
      <p className="mt-1 text-slate-600">Total price starts from ৳{car.price} for one day.</p>
      <div className="mt-5"><label className="label">Driver Needed</label><select className="input" value={driverNeeded} onChange={e=>setDriverNeeded(e.target.value)}><option>Yes</option><option>No</option></select></div>
      <div className="mt-4"><label className="label">Special Note</label><textarea className="input min-h-28" value={specialNote} onChange={e=>setSpecialNote(e.target.value)} placeholder="Pickup time, trip plan, or special request" /></div>
      <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={()=>onClose(false)} className="btn-outline">Cancel</button><button disabled={loading} className="btn-primary">{loading ? "Booking..." : "Book Now"}</button></div>
    </form>
  </div>;
}
