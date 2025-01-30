import { FaTrash, FaPencilAlt } from "react-icons/fa"
import PrioritySelector from "./PrioritySelector"

interface TodoItemProps {
  todo: { id: string; todo: string; done: boolean; priority: "low" | "medium" | "high" }
  toggleDone: (id: string) => void
  changePriority: (id: string, priority: "low" | "medium" | "high") => void
  changeName: (id: string, newName: string) => void
  deleteTodo: (id: string) => void
  editingId: string | null
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>
  newName: string
  setNewName: React.Dispatch<React.SetStateAction<string>>
}

const TodoItem = ({
  todo,
  toggleDone,
  changePriority,
  changeName,
  deleteTodo,
  editingId,
  setEditingId,
  newName,
  setNewName,
}: TodoItemProps) => {
  const todoName = todo.todo || ''; // Fallback to an empty string if todo.todo is null or undefined
  const editableName = newName || ''; // Fallback to an empty string if newName is null or undefined

  return (
    <li
      key={todo.id}
      className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
    >
      <div className="flex items-center gap-x-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleDone(todo.id)}
          className="w-5 h-5 rounded border-gray-400"
        />
        {editingId === todo.id ? (
          <input
            type="text"
            value={editableName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={() => changeName(todo.id, editableName)}
            autoFocus
            className="text-lg p-2 bg-gray-200 rounded-md border-none"
          />
        ) : (
          <span className={`text-lg ${todo.done ? "line-through text-gray-500" : "text-gray-800"}`}>
            {todoName}
          </span>
        )}
      </div>

      <div className="flex items-center gap-x-3">
        <PrioritySelector
          priority={todo.priority}
          changePriority={(priority) => changePriority(todo.id, priority)}
        />
        {editingId !== todo.id && (
          <FaPencilAlt
            onClick={() => {
              setEditingId(todo.id)
              setNewName(todo.todo || '') // Fallback if todo.todo is null or undefined
            }}
            className="text-blue-500 cursor-pointer hover:text-blue-600"
          />
        )}
        <FaTrash
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 cursor-pointer hover:text-red-600"
        />
      </div>
    </li>
  )
}


export default TodoItem
