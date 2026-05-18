"use client";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import CarForm from "@/components/CarForm";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function AddCar() {
  const { data: session } = useSession();

  const submit = async (data) => {
    try {
      await apiFetch("/api/cars", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          ownerEmail: session.user.email,
          ownerName: session.user.name,
        }),
      });
      toast.success("Car added successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <PrivateRoute>
      <section className="container-page py-12">
        <h1 className="section-title">Add Car</h1>
        <p className="mt-2 mb-8 text-slate-600">
          Create a rental listing with price, type, image, seats, and pickup location.
        </p>
        <CarForm onSubmit={submit} buttonText="Add Car" />
      </section>
    </PrivateRoute>
  );
}
