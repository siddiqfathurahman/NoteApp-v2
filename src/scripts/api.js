const BASE_URL = "https://notes-api.dicoding.dev/v2";

// Fetch semua catatan
export const fetchNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes`);
  const data = await response.json();
  return data.data; // Ambil hanya data catatan
};

// Tambah catatan baru
export const addNote = async (title, body) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  return response.json();
};

// Hapus catatan
export const deleteNote = async (id) => {
  await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });
};
