import React, {useEffect, useState} from 'react';
import './App.css';
import { Todo } from "./types/Todo";
import {Button, InputAdornment} from "@mui/material";
import CreateTodoDialog from "./components/CreateTodoDialog";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import TodoList from "./components/TodoList";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                setTodos(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };
        fetchTodos().then(() => setLoading(false));
    }, []);

    // Debounce the search term - to simulate it calling an api
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm]);

    // Filter todos based on debounced search term
    useEffect(() => {
        if (!debouncedSearchTerm) {
            setFilteredTodos(todos);
        } else {
            const filtered = todos.filter(todo =>
                todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
            setFilteredTodos(filtered);
        }
    }, [debouncedSearchTerm, todos]);

    if (error) {
        return (
            // in real life we will have better Error handler
            <span className="error-message">{error}</span>
        );
    }

    const handleCreateTodo = (title: string) => {
        const newTodo: Todo = {
            id: Date.now(), // Simple way to generate a unique ID
            title: title,
            completed: false,
            userId: 1, // Default value
        };
        setTodos([newTodo, ...todos]);
    };

    const handleDelete = (id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const handleToggle = (id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const handleEditTodo = (editedTodo: Todo) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === editedTodo.id ? editedTodo : todo
            )
        );
    };

    return (
        <div className="App">
            <div className="header">
                <h1>Todo list app</h1>
                <div className="header-content">
                    <TextField
                        className="search-input"
                        placeholder="Search todos..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="clear search"
                                            onClick={() => setSearchTerm('')}
                                            edge="end"
                                            size="small"
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button variant="contained" onClick={() => setOpenCreateDialog(true)}>Add Item</Button>
                </div>
            </div>
            <CreateTodoDialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                onSubmit={handleCreateTodo}
            />
            <TodoList
                todoList={filteredTodos}
                loading={loading}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEditTodo}
            ></TodoList>
        </div>
    );
}

export default App;
