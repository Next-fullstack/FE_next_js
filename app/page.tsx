
import TodoForm from "@/components/TodoForm"

import { connection } from 'next/server'

interface Todo {
  id: string
  todo: string
  done: boolean
}

export default async function TodoList() {
  await connection()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const todos: Todo[] = await response.json()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List - java -  nextjs</h1>
        <TodoForm params={todos} />
      </div>
    </div>
  )
}