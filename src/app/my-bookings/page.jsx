"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import Loading from "@/components/Loading";
import { apiFetch, syncServerToken } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
export default function MyBookings(){const {data:session}=useSession(); const [items,setItems]=useState([]),[loading,setLoading]=useState(true); useEffect(()=>{if(session?.user){syncServerToken(session.user).then(()=>apiFetch('/api/bookings/my')).then(d=>setItems(d.bookings||[])).finally(()=>setLoading(false));}},[session]); return <PrivateRoute><section className="container-page py-12"><h1 className="section-title">My Bookings</h1><p className="mt-2 text-slate-600">All booked cars from your logged-in account.</p>{loading?<Loading/>:<div className="mt-8 overflow-x-auto card"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-100"><tr><th className="p-4">Car Name</th><th>Total Price</th><th>Booking Date</th><th>Driver</th><th>Note</th></tr></thead><tbody>{items.map(b=><tr className="border-t" key={b._id}><td className="p-4 font-bold">{b.carName}</td><td>৳{b.totalPrice}</td><td>{new Date(b.bookingDate).toLocaleString()}</td><td>{b.driverNeeded}</td><td>{b.specialNote || 'No note'}</td></tr>)}</tbody></table></div>}</section></PrivateRoute>}
