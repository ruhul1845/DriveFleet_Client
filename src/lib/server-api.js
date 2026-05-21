const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function serverApiFetch(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        cache: "no-store",
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