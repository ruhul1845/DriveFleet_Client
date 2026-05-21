"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const passwordError = () => {
    if (!/[A-Z]/.test(form.password)) {
      return "Password must have an uppercase letter";
    }

    if (!/[a-z]/.test(form.password)) {
      return "Password must have a lowercase letter";
    }

    if (form.password.length < 6) {
      return "Password length must be at least 6 characters";
    }

    return "";
  };

  const submit = async (e) => {
    e.preventDefault();

    const err = passwordError();

    if (err) {
      toast.error(err);
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image,
      });

      if (res.error) {
        throw new Error(res.error.message || "Registration failed");
      }

      toast.success("Registration successful. Please login.");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
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

      toast.success("Login with Google successful");
    } catch (err) {
      toast.error(err.message || "Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-12">
      <form onSubmit={submit} className="card w-full max-w-md p-7">
        <h1 className="text-3xl font-black">Register</h1>

        <p className="mt-2 text-slate-600">
          Create an account and start using DriveFleet.
        </p>

        <div className="mt-6">
          <label className="label">Name</label>
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={change}
            required
          />
        </div>

        <div className="mt-4">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={form.email}
            onChange={change}
            required
          />
        </div>

        <div className="mt-4">
          <label className="label">Photo URL</label>
          <input
            className="input"
            name="image"
            value={form.image}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            required
          />

          <p className="mt-2 text-sm text-slate-500">
            Uppercase, lowercase, minimum 6 characters.
          </p>
        </div>

        <button disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? "Creating..." : "Register"}
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
          Already registered?{" "}
          <Link className="font-bold text-amber-600" href="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}