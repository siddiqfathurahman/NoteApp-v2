import { addNote } from "./api.js";
import { renderNotes } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    renderNotes();

    const form = document.getElementById("note-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const title = document.getElementById("note-title").value;
        const body = document.getElementById("note-body").value;

        await addNote(title, body);
        form.reset();
        renderNotes(); // Perbarui daftar setelah menambahkan
    });
});
