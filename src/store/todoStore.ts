import { create } from "zustand";
import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  search: string;
  fetchTodos: () => void;
  addTodo: (title: string) => void;
  updateTodo: (id: string, completed: boolean) => void;
  editTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
  setSearch: (value: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  search: "",

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("https://676bea73bc36a202bb862622.mockapi.io/todos");
      set({ todos: res.data });
    } catch (err) {
      console.error("Failed to fetch", err);
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (title) => {
    const newTodo = { title, completed: false };
    try {
      const res = await axios.post("https://676bea73bc36a202bb862622.mockapi.io/todos", newTodo);
      set({ todos: [...get().todos, res.data] });
    } catch (err) {
      console.error("Add error", err);
    }
  },

  updateTodo: async (id, completed) => {
    try {
      await axios.put(`https://676bea73bc36a202bb862622.mockapi.io/todos/${id}`, { completed });
      const updated = get().todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      );
      set({ todos: updated });
    } catch (err) {
      console.error("Update error", err);
    }
  },

  editTodo: async (id, title) => {
    try {
      await axios.put(`https://676bea73bc36a202bb862622.mockapi.io/todos/${id}`, { title });
      const updated = get().todos.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      );
      set({ todos: updated });
    } catch (err) {
      console.error("Edit error", err);
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`https://676bea73bc36a202bb862622.mockapi.io/todos/${id}`);
      set({ todos: get().todos.filter((todo) => todo.id !== id) });
    } catch (err) {
      console.error("Delete error", err);
    }
  },

  setSearch: (value) => set({ search: value }),
}));
