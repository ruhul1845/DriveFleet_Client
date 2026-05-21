"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import Loading from "@/components/Loading";
import CarCard from "@/components/CarCard";
import CarForm from "@/components/CarForm";
import { apiFetch, syncServerToken } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function MyAddedCars() {
  const { data: session, isPending } = useSession();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadCars = useCallback(async () => {
    if (!session?.user) {
      if (!isPending) setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await syncServerToken(session.user);

      const data = await apiFetch("/api/cars/my");
      setCars(data.cars || []);
    } catch (error) {
      console.error("LOAD MY CARS ERROR:", error);
      toast.error(error.message || "Failed to load your cars");
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, [session, isPending]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const updateCar = async (formData) => {
    if (!edit?._id) {
      toast.error("Car ID is missing");
      return;
    }

    if (!session?.user) {
      toast.error("Please login again");
      return;
    }

    try {
      setUpdating(true);
      await syncServerToken(session.user);

      const updatePayload = {
        carName: formData.carName ?? formData.name ?? edit.carName ?? edit.name ?? "",
        dailyRentPrice: Number(
          formData.dailyRentPrice ?? formData.price ?? edit.dailyRentPrice ?? edit.price ?? 0
        ),
        carType: formData.carType ?? formData.type ?? edit.carType ?? edit.type ?? "",
        imageUrl: formData.imageUrl ?? formData.image ?? edit.imageUrl ?? edit.image ?? "",
        seatCapacity: Number(
          formData.seatCapacity ?? formData.seats ?? edit.seatCapacity ?? edit.seats ?? 0
        ),
        pickupLocation:
          formData.pickupLocation ??
          formData.location ??
          edit.pickupLocation ??
          edit.location ??
          "",
        description: formData.description ?? edit.description ?? "",
        availabilityStatus:
          formData.availabilityStatus ??
          edit.availabilityStatus ??
          (formData.available === false ? "Unavailable" : "Available"),
      };

      const result = await apiFetch(`/api/cars/${edit._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatePayload),
      });

      toast.success(result.message || "Car updated successfully");
      setEdit(null);
      await loadCars();
    } catch (error) {
      console.error("UPDATE CAR ERROR:", error);
      toast.error(error.message || "Failed to update car");
    } finally {
      setUpdating(false);
    }
  };

  const deleteCar = async () => {
    if (!del?._id) {
      toast.error("Car ID is missing");
      return;
    }

    if (!session?.user) {
      toast.error("Please login again");
      return;
    }

    try {
      setDeleting(true);
      await syncServerToken(session.user);

      const result = await apiFetch(`/api/cars/${del._id}`, {
        method: "DELETE",
      });

      toast.success(result.message || "Car deleted successfully");
      setDel(null);
      await loadCars();
    } catch (error) {
      console.error("DELETE CAR ERROR:", error);
      toast.error(error.message || "Failed to delete car");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PrivateRoute>
      <section className="container-page py-12">
        <h1 className="section-title">My Added Cars</h1>

        <p className="mt-2 text-slate-600">
          Update or delete only the listings you created.
        </p>

        {loading || isPending ? (
          <Loading />
        ) : cars.length === 0 ? (
          <div className="card mt-8 p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              No cars added yet
            </h2>
            <p className="mt-2 text-slate-600">
              Add a car first to manage your listings here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                ownerActions
                onEdit={setEdit}
                onDelete={setDel}
              />
            ))}
          </div>
        )}

        {edit && (
          <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/60 p-4">
            <div className="mx-auto my-8 max-w-4xl">
              <CarForm
                defaultValue={edit}
                onSubmit={updateCar}
                buttonText={updating ? "Updating..." : "Update Car"}
              />

              <button
                type="button"
                onClick={() => setEdit(null)}
                disabled={updating}
                className="btn-outline mt-4 bg-white"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {del && (
          <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/60 p-4">
            <div className="card max-w-md p-7">
              <h2 className="text-2xl font-black">
                Delete {del.carName || del.name}?
              </h2>

              <p className="mt-2 text-slate-600">
                This confirmation modal prevents accidental deletion.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDel(null)}
                  disabled={deleting}
                  className="btn-outline"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={deleteCar}
                  disabled={deleting}
                  className="btn-primary !bg-red-500 !text-white"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </PrivateRoute>
  );
}