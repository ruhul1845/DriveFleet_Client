const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const TOKEN_KEY = "drivefleet_token";

let serverToken = null;

function toServerPath(path) {
  if (API_URL) return `${API_URL}${path}`;
  if (path.startsWith("/api/")) return `/server-api/${path.slice(5)}`;
  return path;
}

function getServerToken() {
  if (serverToken) return serverToken;
  if (typeof window !== "undefined") {
    serverToken = sessionStorage.getItem(TOKEN_KEY);
  }
  return serverToken;
}

function setServerToken(token) {
  serverToken = token || null;
  if (typeof window === "undefined") return;
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export function clearServerToken() {
  setServerToken(null);
}

export async function apiFetch(path, options = {}) {
  const url = toServerPath(path);
  const token = getServerToken();

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data;
}

/** Mint a JWT on the Next server (same secret as Express API) and store it for apiFetch. */
export async function syncServerToken(user) {
  if (!user?.email) return null;

  const res = await fetch("/api/sync-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name || "",
      email: user.email,
      image: user.image || user.photo || user.photoURL || "",
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to sync API token");
  }

  if (!data.token) {
    throw new Error("API token missing. Check JWT_SECRET in .env.local matches your backend.");
  }

  setServerToken(data.token);
  return data;
}
