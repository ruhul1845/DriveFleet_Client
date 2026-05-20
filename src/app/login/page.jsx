"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { syncServerToken } from "@/lib/api";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        throw new Error(res.error.message || "Login failed");
      }

      await syncServerToken({
        email,
        name: res.data?.user?.name,
        image: res.data?.user?.image,
      });

      toast.success("Login successful");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setGoogleLoading(true);

    try {
      const res = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (res?.error) {
        throw new Error(res.error.message || "Google login failed");
      }

      toast.success("Redirecting to Google...");
    } catch (err) {
      toast.error(err.message || "Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-12">
      <form onSubmit={submit} className="card w-full max-w-md p-7">
        <h1 className="text-3xl font-black">Login</h1>

        <p className="mt-2 text-slate-600">
          Access bookings, listings, and rental features.
        </p>

        <div className="mt-6">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={google}
          disabled={googleLoading}
          className="btn-outline mt-3 w-full"
        >
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="mt-5 text-center text-slate-600">
          New here?{" "}
          <Link className="font-bold text-amber-600" href="/register">
            Create account
          </Link>
        </p>
      </form>
    </section>
  );
}