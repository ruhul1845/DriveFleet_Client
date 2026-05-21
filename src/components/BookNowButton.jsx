"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BookingModal from "@/components/BookingModal";
import { apiFetch, syncServerToken } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function BookNowButton({ car, carId }) {
    const router = useRouter();
    const { data: session } = useSession();

    const [modal, setModal] = useState(false);
    const [currentCar, setCurrentCar] = useState(car);

    const book = async () => {
        if (!session?.user) {
            toast.error("Please login to book a car");
            router.push("/login");
            return;
        }

        await syncServerToken(session.user);
        setModal(true);
    };

    const closeModal = async (done) => {
        setModal(false);

        if (done) {
            const data = await apiFetch(`/api/cars/${carId}`);
            setCurrentCar(data.car);
        }
    };

    return (
        <>
            <button
                disabled={!currentCar.available}
                onClick={book}
                className="btn-primary mt-7 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Book Now
            </button>

            {modal && (
                <BookingModal
                    car={currentCar}
                    user={session.user}
                    onClose={closeModal}
                />
            )}
        </>
    );
}