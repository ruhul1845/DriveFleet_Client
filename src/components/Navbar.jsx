"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Car, UserCircle } from "lucide-react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const nav = [
  ["Home", "/"],
  ["Explore Cars", "/explore-cars"],
  ["Add Car", "/add-car"],
  ["My Bookings", "/my-bookings"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();

    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
      });
    } catch { }

    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tight"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400 text-slate-950">
            <Car />
          </span>
          DriveFleet
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="font-semibold text-slate-700 hover:text-amber-600"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfile(!profile)}
                className="flex items-center gap-3 rounded-full px-2 py-1 transition "
              >
                <span className="text-sm font-bold text-slate-700">
                  Hi, {user.name || "User"}
                </span>

                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <UserCircle className="h-11 w-11 text-slate-600" />
                )}
              </button>

              {profile && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">
                  <Link
                    className="block px-5 py-3 hover:bg-amber-50"
                    href="/add-car"
                    onClick={() => setProfile(false)}
                  >
                    Add Car
                  </Link>

                  <Link
                    className="block px-5 py-3 hover:bg-amber-50"
                    href="/my-bookings"
                    onClick={() => setProfile(false)}
                  >
                    My Bookings
                  </Link>

                  <Link
                    className="block px-5 py-3 hover:bg-amber-50"
                    href="/my-added-cars"
                    onClick={() => setProfile(false)}
                  >
                    My Added Cars
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full px-5 py-3 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white p-4 lg:hidden">
          <div className="container-page grid gap-3">
            {nav.map(([label, href]) => (
              <Link
                onClick={() => setOpen(false)}
                key={href}
                href={href}
                className="rounded-xl px-3 py-2 font-semibold hover:bg-amber-50"
              >
                {label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <UserCircle className="h-11 w-11 text-slate-600" />
                  )}

                  <span className="font-bold text-slate-700">
                    Hi, {user.name || "User"}
                  </span>
                </div>

                <Link
                  href="/my-added-cars"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 font-semibold hover:bg-amber-50"
                >
                  My Added Cars
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-2 text-left font-semibold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}