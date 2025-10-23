import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, Button, Container, Paper, Box } from '@mui/material';
import { Title } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { TaskFormProps, Task } from '../types';

export default function BasicDateTimePicker({ onAdd }: TaskFormProps) {
    const [task, setTask] = useState<Task>({ task: " ", date: new Date() });
    function handleSubmit(e: React.FormEvent) {

        e.preventDefault();
        if (task && task.task.trim()) {

            onAdd(task);
            setTask({ task: " ", date: new Date() });
        }
    }
    return (
        <Paper elevation={12} sx={{ width: "fit-content", display: 'flex', flexDirection: "column", float: "left", pt: 5, pb: 5, pr: 2, pl: 2 }}>
            <form onSubmit={handleSubmit} method='post'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker ampm={false} label="Pick the deadline of the task" value={task.date ? dayjs(task.date).second(0).millisecond(0) : null}
                            onChange={
                                (newVal: Dayjs | null) => setTask(prev =>
                                    ({ ...prev, date: newVal ? newVal.toDate() : task.date })
                                )
                            }
                        />
                    </DemoContainer>

                </LocalizationProvider>
                <TextField sx={{ mt: 2 }}
                    id="outlined-multiline-static"
                    label="Task"
                    multiline
                    rows={4}
                    fullWidth
                    value={task.task}
                    onChange={
                        (event) => setTask(prev =>
                            ({ ...prev, task: event.target.value })
                        )
                    }
                />
                <Button type='submit' fullWidth variant='outlined' sx={{ mt: 2 }} >Add note</Button>

            </form>

        </Paper>


    );
}
