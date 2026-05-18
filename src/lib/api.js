const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function toServerPath(path) {
  if (API_URL) return `${API_URL}${path}`;
  if (path.startsWith('/api/')) return `/server-api/${path.slice(5)}`;
  return path;
}

export async function apiFetch(path, options = {}) {
  const url = toServerPath(path);

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data;
}

export async function syncServerToken(user) {
  if (!user?.email) return null;

  return apiFetch("/api/auth/jwt", {
    method: "POST",
    body: JSON.stringify({
      name: user.name || "",
      email: user.email,
      image: user.image || user.photo || user.photoURL || "",
    }),
  });
}
