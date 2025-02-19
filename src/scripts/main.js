import { fetchNotes, deleteNote, addNote } from "./api.js";
import gsap from "gsap";
import Swal from "sweetalert2"; 

export const renderNotes = async () => {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = '<div class="loader"></div>';

    const notes = await fetchNotes();
    console.log("Daftar catatan terbaru:", notes);

    notesList.innerHTML = "";

    notes.reverse().forEach((note) => {
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Judul dan isi catatan tidak boleh kosong!",
        });

        return false;
    }

    try {
        await addNote(title, body);
        titleInput.value = "";
        bodyInput.value = "";

        Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Catatan berhasil ditambahkan.",
            timer: 1500,
            showConfirmButton: false
        });

        renderNotes();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Terjadi kesalahan saat menambahkan catatan.",
        });
    }
};

window.handleDelete = async (id, button) => {
    const confirmDelete = await Swal.fire({
        title: "Yakin ingin menghapus?",
        text: "Catatan yang dihapus tidak bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    });

    if (!confirmDelete.isConfirmed) return;

    const noteElement = button.parentElement;

    gsap.to(noteElement, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: async () => {
            try {
                await deleteNote(id);
                Swal.fire({
                    icon: "success",
                    title: "Dihapus!",
                    text: "Catatan berhasil dihapus.",
                    timer: 1500,
                    showConfirmButton: false
                });
                renderNotes();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat menghapus catatan.",
                });
            }
            return false;
        },
    });
};

document.getElementById("note-form").addEventListener("submit", handleAddNote);

window.onload = () => {
    gsap.from("h1", { opacity: 0, y: -20, duration: 0.8 });
    gsap.from("form", { opacity: 0, scale: 0.9, duration: 0.6 });
    renderNotes();
};
