'use client'

import { Navbar } from "@/components/Navbar"
import TodoForm from "@/components/todo/TodoForm"
import { useState } from "react"
import { FaTrash, FaPencilAlt } from "react-icons/fa" // Import icons

// Trial data to simulate tasks
interface Todo {
  id: string
  todo: string
  done: boolean
  priority: "low" | "medium" | "high"
}

export default function TodoList() {
  // State for managing tasks
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", todo: "Buy groceries", done: false, priority: "low" },
    { id: "2", todo: "Walk the dog", done: false, priority: "medium" },
    { id: "3", todo: "Complete homework", done: true, priority: "high" },
  ])

  // State to manage edit mode for task names
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState<string>("")

  // Function to add a task
  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  // Function to change the "done" status of a task
  const toggleDone = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  // Function to change the priority of a task
  const changePriority = (id: string, priority: "low" | "medium" | "high") => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, priority } : todo
      )
    )
  }

  // Function to change the name of a task
  const changeName = (id: string, newName: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: newName } : todo
      )
    )
    setEditingId(null) // Exit edit mode after saving
  }

  // Function to delete a task
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">To-Do List</h1>
          <TodoForm addTodo={addTodo} />
          <ul className="mt-6 space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
              >
                <div className="flex items-center gap-x-3">
                  {/* Checkbox for Done status */}
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleDone(todo.id)}
                    className="w-5 h-5 rounded border-gray-400"
                  />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={() => changeName(todo.id, newName)}
                      autoFocus
                      className="text-lg p-2 bg-gray-200 rounded-md border-none"
                    />
                  ) : (
                    <span
                      className={`text-lg ${todo.done ? "line-through text-gray-500" : "text-gray-800"}`}
                    >
                      {todo.todo}
                    </span>
                  )}
                  {/* Priority Color Dot */}
                  <span
                    className={`w-3 h-3 rounded-full ml-2 ${todo.priority === "low" ? "bg-green-500" : todo.priority === "medium" ? "bg-yellow-500" : "bg-red-500"}`}
                  ></span>
                </div>

                <div className="flex items-center gap-x-3">
                  {/* Priority Dropdown */}
                  <select
                    value={todo.priority}
                    onChange={(e) => changePriority(todo.id, e.target.value as "low" | "medium" | "high")}
                    className="p-2 text-xs font-semibold text-black rounded-md bg-white border-gray-400 hover:bg-gray-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  {/* Edit Task Name */}
                  {editingId !== todo.id && (
                    <FaPencilAlt
                      onClick={() => {
                        setEditingId(todo.id)
                        setNewName(todo.todo)
                      }}
                      className="text-blue-500 cursor-pointer hover:text-blue-600"
                    />
                  )}

                  {/* Delete Task */}
                  <FaTrash
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 cursor-pointer hover:text-red-600"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
