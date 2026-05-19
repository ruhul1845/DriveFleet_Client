"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";
import { useSession } from "@/lib/auth-client";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) router.push("/login");
    // return () => { cancelled = true; };
  }, [isPending, session, router]);

  if (isPending || !session?.user) return <Loading />;
  return children;
}
