import { fetchNotes, deleteNote, addNote } from "./api.js";
import gsap from "gsap";

export const renderNotes = async () => {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = '<div class="loader"></div>';

    const notes = await fetchNotes();
    console.log("Daftar catatan terbaru:", notes); 

    notesList.innerHTML = "";

    notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
        <div class="note-content">
            <h3>${note.title}</h3>
            <p>${note.body}</p>
        </div>
        <button class="delete-btn" onclick="handleDelete('${note.id}', this)">
            <i class="fas fa-trash"></i>
        </button>
    `;

        notesList.appendChild(noteElement);


        gsap.from(noteElement, { opacity: 0, y: 20, duration: 0.5 });
    });
};


window.handleAddNote = async (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("note-title");
    const bodyInput = document.getElementById("note-body");

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title === "" || body === "") {
        alert("Judul dan isi catatan tidak boleh kosong!");
        return;
    }

    await addNote(title, body);


    titleInput.value = "";
    bodyInput.value = "";

    renderNotes();
};

window.handleDelete = async (id, button) => {
    const noteElement = button.parentElement;

    gsap.to(noteElement, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: async () => {
            await deleteNote(id);
            renderNotes();
        },
    });
};


document.getElementById("note-form").addEventListener("submit", handleAddNote);

window.onload = () => {
    gsap.from("h1", { opacity: 0, y: -20, duration: 0.8 });
    gsap.from("form", { opacity: 0, scale: 0.9, duration: 0.6 });
    renderNotes();
};
