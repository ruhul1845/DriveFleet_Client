"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";
import { useSession } from "@/lib/auth-client";
import { syncServerToken } from "@/lib/api";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !session?.user) router.push("/login");
    if (session?.user) syncServerToken(session.user).catch(() => {});
  }, [isPending, session, router]);
  if (isPending || !session?.user) return <Loading />;
  return children;
}
