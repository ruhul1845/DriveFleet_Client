const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const JWT_ENABLED = false;

/** Browser uses same-origin proxy (/server-api) to avoid CORS errors with Vercel API. */
function toServerPath(path) {
  if (path.startsWith("/api/")) {
    if (typeof window !== "undefined") {
      return `/server-api/${path.slice(5)}`;
    }
    if (API_URL) return `${API_URL}${path}`;
    return `/server-api/${path.slice(5)}`;
  }
  if (API_URL) return `${API_URL}${path}`;
  return path;
}

export function clearServerToken() {
}

export async function apiFetch(path, options = {}) {
  const url = toServerPath(path);

  let res;
  try {
    res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch (err) {
    throw new Error(
      err?.message === "Failed to fetch"
        ? "Cannot reach the API server. Check your network or try again in a moment."
        : err?.message || "Network request failed"
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data;
}

export async function getFeaturedCars() {
  const data = await apiFetch("/api/cars/featured");
  return data.cars || [];
}

export async function getCars({ search = "", type = "", limit } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (type) params.set("type", type);
  if (limit) params.set("limit", String(limit));
  const query = params.toString();
  const data = await apiFetch(`/api/cars${query ? `?${query}` : ""}`);
  return data.cars || [];
}

export async function getCar(id) {
  const data = await apiFetch(`/api/cars/${id}`);
  return data.car;
}

export async function getMyCars() {
  const data = await apiFetch("/api/cars/my");
  return data.cars || [];
}

export async function getMyBookings() {
  const data = await apiFetch("/api/bookings/my");
  return data.bookings || [];
}

export async function syncServerToken(_user) {
  if (!JWT_ENABLED) return null;
}
