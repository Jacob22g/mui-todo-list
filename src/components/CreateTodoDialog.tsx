import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CreateTodoDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (title: string) => void;
}

function CreateTodoDialog({ open, onClose, onSubmit }: CreateTodoDialogProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(title);
        setTitle('');
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
            <DialogTitle>Create New Todo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the task for your new todo item.
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
                <Button type="submit" disabled={!title?.trim()}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateTodoDialog;
