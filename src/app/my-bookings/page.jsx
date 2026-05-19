"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import Loading from "@/components/Loading";
import { getMyBookings } from "@/lib/api";

function MyBookingsContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadBookings() {
      try {
        const bookings = await getMyBookings();
        if (!cancelled) setItems(bookings);
      } catch (err) {
        if (!cancelled) toast.error(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBookings();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="container-page py-12">
      <h1 className="section-title">My Bookings</h1>
      <p className="mt-2 text-slate-600">All booked cars from your logged-in account.</p>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-8 overflow-x-auto card">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4">Car Name</th>
                <th>Total Price</th>
                <th>Booking Date</th>
                <th>Driver</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr className="border-t" key={b._id}>
                  <td className="p-4 font-bold">{b.carName}</td>
                  <td>৳{b.totalPrice}</td>
                  <td>{new Date(b.bookingDate).toLocaleString()}</td>
                  <td>{b.driverNeeded}</td>
                  <td>{b.specialNote || "No note"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function MyBookings() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
