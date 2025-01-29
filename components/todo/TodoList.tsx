import { useState } from "react"
import TodoItem from "./TodoItem"
import TodoForm from "@/components/todo/TodoForm"

// Trial data to simulate tasks
interface Todo {
  id: string
  todo: string
  done: boolean
  priority: "low" | "medium" | "high"
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", todo: "Buy groceries", done: false, priority: "low" },
    { id: "2", todo: "Walk the dog", done: false, priority: "medium" },
    { id: "3", todo: "Complete homework", done: true, priority: "high" },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState<string>("")

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const toggleDone = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const changePriority = (id: string, priority: "low" | "medium" | "high") => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, priority } : todo
      )
    )
  }

  const changeName = (id: string, newName: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: newName } : todo
      )
    )
    setEditingId(null)
  }

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <ul className="mt-6 space-y-4">
          {todos.map((todo) => (
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
          ))}
        </ul>
      </div>
    </div>
  )
}
