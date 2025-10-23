import React, { useState } from "react"
import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";
import ToDoContainer from "../single components/ToDo"
import NotesList from "../single components/NotesList";
import { Task } from "../types"
const today = new Date();
const tomorrow = new Date(today);
const dayAfterTomorrow = new Date(tomorrow);
tomorrow.setDate(today.getDate() + 1);
dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
const rows = [
    { date: today, task: "task1" },
    { date: tomorrow, task: "task2" },
    { date: dayAfterTomorrow, task: "task3" },
    { date: dayAfterTomorrow, task: "task4" },
    { date: dayAfterTomorrow, task: "task5" },
];

export default () => {
    const [notes, setNotes] = useState<Task[]>(rows);
    function addNote(note: Task) {
        setNotes([...notes, note]);

    }
    function deleteNote(toDelete: Task) {
        let index = notes.indexOf(toDelete);
        let newNotes = notes.filter(val => val !== notes[index]);
        setNotes(newNotes);
    }
    return (
        <Container sx={{ height: "fit-content" }}>
            <Container sx={{ display: "flex", maxHeight: 350 }}>
                <ToDoContainer onAdd={addNote} />
                <NotesList notes={notes} onDelete={deleteNote} />
            </Container>
        </Container>
    )
}
