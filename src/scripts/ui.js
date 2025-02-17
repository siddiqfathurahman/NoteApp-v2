import { fetchNotes, deleteNote } from "./api.js";

export const renderNotes = async () => {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "<p>Loading...</p>";

  const notes = await fetchNotes();
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.body}</p>
            <button onclick="handleDelete('${note.id}')">Hapus</button>
        `;
    notesList.appendChild(noteElement);
  });
};

window.handleDelete = async (id) => {
  await deleteNote(id);
  renderNotes(); // Perbarui daftar setelah menghapus
};
