'use client'


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Trash2 } from "lucide-react"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { deleteTodos, insertTodos, updateTodos } from "@/app/Actions/Todo"
import { useState } from "react"
import { useRouter } from "next/navigation"
interface Todo {
    id: string
    todo: string
    done: boolean
}
interface TodoFormProps {
    params: Todo[]
}
const formSchema = z.object({
    todo: z.string().min(1).max(50),
})





export default function TodoForm({ params }: TodoFormProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            todo: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(todo: z.infer<typeof formSchema>) {
        console.log("🚀 ~ onSubmit ~ values:", todo)
        try {
            const result = await insertTodos(todo)
            if (result) {
                form.reset()
                router.refresh();
            }
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error)

        }
    }
    async function handleTodo(id: string) {
        try {

            const result = await updateTodos(id);
            if (result) {
                // Refresh server data
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }

    }
    async function handleDelete(id: string) {
        try {
            setDeletingId(id);
            const result = await deleteTodos(id);
            if (result) {
                // Refresh server data
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDeletingId(null);
        }

    }
    return (
        <div className="w-full">
            <div className="mb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-row gap-x-4">
                        <FormField
                            control={form.control}
                            name="todo"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Todo</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="todo" {...field} className="" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Tambah</Button>
                    </form>
                </Form>
            </div>
            <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {params.map((todo) => (
                    <li key={todo.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div
                            className={`flex items-center flex-grow cursor-pointer ${todo.done ? "line-through text-gray-500" : ""}`}
                            onClick={() => handleTodo(todo.id)}
                        >
                            <span
                                className={`w-4 h-4 border border-gray-300 rounded-sm mr-2 ${todo.done ? "bg-blue-500" : ""}`}
                            ></span>
                            {todo.todo}
                        </div>
                        <Button
                            disabled={deletingId === todo.id}
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(todo.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            {deletingId === todo.id ?
                                <Loader2 className="animate-spin" /> :
                                <Trash2 className="h-4 w-4" />
                            }
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
