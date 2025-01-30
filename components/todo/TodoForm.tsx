'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"

interface TodoFormProps {
  addTodo: (newTodo: Todo) => void
}

interface Todo {
  id: string
  todo: string
  done: boolean
  priority: "low" | "medium" | "high"
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [todoText, setTodoText] = useState("")

  const onSubmit = (data: { todo: string }) => {
    if (data.todo.trim() !== "") {
      const newTodo = {
        id: Math.random().toString(36).substring(7),
        todo: data.todo,
        done: false,
        priority: "low", // Default priority
      }
      addTodo(newTodo)
      setTodoText("") // Clear input field after submit
      reset() // Reset form values
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <Input
        {...register("todo", { required: "Task is required" })} // Register input with validation
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)} // Track input value
        placeholder="Add new task"
        className="flex-1"
      />
      <Button type="submit">Add Task</Button>
      {errors.todo && <p className="text-red-500 text-xs">{errors.todo.message}</p>} {/* Display error message */}
    </form>
  )
}
