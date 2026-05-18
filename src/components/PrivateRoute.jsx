"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { useSession } from "@/lib/auth-client";
import { syncServerToken } from "@/lib/api";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      setTokenReady(false);
      router.push("/login");
      return;
    }

    let cancelled = false;
    setTokenReady(false);

    syncServerToken(session.user)
      .then(() => {
        if (!cancelled) setTokenReady(true);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err.message || "Could not connect to API");
          router.push("/login");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isPending, session, router]);

  if (isPending || !session?.user || !tokenReady) return <Loading />;
  return children;
}
