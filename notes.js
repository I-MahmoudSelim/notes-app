const fs = require("fs");

const getNotes = function () {
    try {
        const notesBuffer = fs.readFileSync("notes.json");
        const notesJSON = notesBuffer.toString();
        const notes = JSON.parse(notesJSON);
        return notes
    } catch (error) {
        return []
    }

};
function listNotes() {
    console.log(getNotes());
}
function getNote(title) {
    const notes = getNotes();
    try {
        const theNote = notes.filter((note) => note.title === title);
        console.log(theNote);
    } catch (error) {
        console.log(`there is no notes with title of ${title}`)
    }
}

function addNote(title, body) {
    const notes = getNotes();

    const dublicatedNote = notes.filter((note) => {
        return note.title === title;
    });
    debugger
    if (dublicatedNote.length > 0) {
        console.log("this title is taken,ues -edit- to change its body")
    } else {
        notes.push({
            title: title,
            body: body
        });
    }

    saveNotes(notes)
}

function removeNote(title) {
    const notes = getNotes();
    const index = findNote(title, notes);

    notes.splice(index, 1);

    saveNotes(notes)

}

function editNote(title, body) {
    const notes = getNotes();
    const index = findNote(title, notes);

    notes.splice(index, 1, { title: title, body: body });

    saveNotes(notes);
}

function findNote(title, notes) {
    return notes.findIndex(note => note.title === title);
}

function saveNotes(notes) {
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJson);
    console.log(notes)
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    editNote: editNote,
    removeNote: removeNote,
    getNote: getNote
};
