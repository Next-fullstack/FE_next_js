import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "@/components/todo/TodoForm";
import { getTodos } from "@/lib/api";

// Interface for Todo items
interface Todo {
  id: string;
  todo: string;
  done: boolean;
  priority: "low" | "medium" | "high";
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");

  // Fetch todos on component mount
  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos || []);
    }
    fetchTodos();
  }, []);

  // Add a new Todo
  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Toggle the 'done' status of a Todo
  const toggleDone = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Change the priority of a Todo
  const changePriority = (id: string, priority: "low" | "medium" | "high") => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  };

  // Change the name of a Todo (when editing)
  const changeName = (id: string, newName: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: newName } : todo
      )
    );
    setEditingId(null);
  };

  // Delete a Todo
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <ul className="mt-6 space-y-4">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              todo ? ( // Add this check to ensure 'todo' is not null
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleDone={toggleDone}
                  changePriority={changePriority}
                  changeName={changeName}
                  deleteTodo={deleteTodo}
                  editingId={editingId}
                  setEditingId={setEditingId}
                  newName={newName}
                  setNewName={setNewName}
                />
              ) : null
            ))
          ) : (
            <p>No todos available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
