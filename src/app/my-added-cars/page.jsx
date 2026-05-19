"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import Loading from "@/components/Loading";
import CarCard from "@/components/CarCard";
import CarForm from "@/components/CarForm";
import { apiFetch, getMyCars } from "@/lib/api";

function MyAddedCarsContent() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getMyCars();
      setCars(list);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = async (data) => {
    try {
      await apiFetch(`/api/cars/${edit._id}`, { method: "PUT", body: JSON.stringify(data) });
      toast.success("Car updated");
      setEdit(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async () => {
    try {
      await apiFetch(`/api/cars/${del._id}`, { method: "DELETE" });
      toast.success("Car deleted");
      setDel(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="container-page py-12">
      <h1 className="section-title">My Added Cars</h1>
      <p className="mt-2 text-slate-600">Update or delete only the listings you created.</p>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} ownerActions onEdit={setEdit} onDelete={setDel} />
          ))}
        </div>
      )}
      {edit && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/60 p-4">
          <div className="mx-auto my-8 max-w-4xl">
            <CarForm defaultValue={edit} onSubmit={update} buttonText="Update Car" />
            <button onClick={() => setEdit(null)} className="btn-outline mt-4 bg-white">
              Close
            </button>
          </div>
        </div>
      )}
      {del && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/60 p-4">
          <div className="card max-w-md p-7">
            <h2 className="text-2xl font-black">Delete {del.name}?</h2>
            <p className="mt-2 text-slate-600">This confirmation modal prevents accidental deletion.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDel(null)} className="btn-outline">
                Cancel
              </button>
              <button onClick={remove} className="btn-primary !bg-red-500 !text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function MyAddedCars() {
  return (
    <PrivateRoute>
      <MyAddedCarsContent />
    </PrivateRoute>
  );
}
