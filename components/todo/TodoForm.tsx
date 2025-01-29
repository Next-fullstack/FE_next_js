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
  const [todoText, setTodoText] = useState("")
  const { handleSubmit } = useForm()

  const onSubmit = () => {
    if (todoText.trim() !== "") {
      const newTodo = {
        id: Math.random().toString(36).substring(7),
        todo: todoText,
        done: false,
        priority: "low", // Default priority
      }
      addTodo(newTodo)
      setTodoText("")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <Input
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add new task"
        className="flex-1"
      />
      <Button type="submit">Add Task</Button>
    </form>
  )
}
