import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types/Todo';
import {Skeleton} from "@mui/material";
import {useEffect, useState} from "react";
import EditTodoDialog from "./EditTodoDialog";

interface TodoListProps {
    todoList: Todo[];
    loading: boolean;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (todo: Todo) => void;
}

function TodoList({ todoList, loading, onDelete, onToggle, onEdit }: TodoListProps) {
    const [todos, setTodos] = useState<Todo[]>(todoList);
    const [editedTodo, setEditedTodo] = useState<Todo>(todos[0]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        setTodos(todoList);
    }, [todoList]);

    if (loading) {
        return (
            <>
                {Array.from({ length: 50 }, (_, index) => (
                    <Skeleton key={index} animation="wave" sx={{ height: 50 }}/>
                ))}
            </>
        );
    }

    function handleEdit(todo: Todo) {
        setEditedTodo(todo)
        setEditDialogOpen(true)
    }

    return (
        <>
            <List>
                {todos.map((todo) => {
                    return (
                        <>
                            <ListItem
                                key={todo.id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => onDelete(todo.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={todo.completed}
                                            onChange={() => onToggle(todo.id)}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={todo.title} onClick={() => handleEdit(todo)}/>
                                </ListItemButton>
                            </ListItem>
                        </>
                    );
                })}
            </List>
            <EditTodoDialog
                open={editDialogOpen}
                todo={editedTodo}
                onClose={() => setEditDialogOpen(false)}
                onSubmit={(todo) => onEdit(todo)}
            />
        </>
    );
}

export default React.memo(TodoList);
