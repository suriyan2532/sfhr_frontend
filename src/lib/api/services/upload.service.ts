const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function uploadFiles(formData: FormData, token: string) {
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers: {
      "x-access-token": token,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload files");
  }

  return res.json();
}
