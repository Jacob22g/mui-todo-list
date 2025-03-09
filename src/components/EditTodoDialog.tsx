import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Todo} from "../types/Todo";

interface EditTodoDialogProps {
    open: boolean;
    todo: Todo;
    onClose: () => void;
    onSubmit: (todo: Todo) => void;
}

function EditTodoDialog({ open, onClose, onSubmit, todo }: EditTodoDialogProps) {
    const [title, setTitle] = useState(todo?.title || '');

    useEffect(() => {
        setTitle(todo?.title);
    }, [todo]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedTodo = { ...todo }
        updatedTodo.title = title
        onSubmit(updatedTodo);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit,
                },
            }}
        >
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update your todo item.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="To do task"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={!title?.trim()}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditTodoDialog;
