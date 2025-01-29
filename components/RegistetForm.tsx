"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import * as z from "zod"
import { Loader2 } from "lucide-react"

export const loginSchema = z.object({
    username: z.string().min(1, {
        message: "Tolong masukan username",
    }),
    password: z.string().min(1, {
        message: "Password belum di isi",
    }),
})

type LoginFormData = z.infer<typeof loginSchema>



export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    // ie ti form 

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true)
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL
            if (!apiUrl) {
                throw new Error('API URL not configured')
            }

            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: "POST",
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!result.ok) {
                const errorData = await result.json();
                console.error(errorData);
                return;
            }

            const responseData = await result.json();

            // Set cookie using vanilla JS
            document.cookie = `token=${responseData.token}; path=/; expires=${new Date(Date.now() + responseData.expiresIn).toUTCString()}; SameSite=Strict`;

            console.log('Registration successful:', responseData);
            // Handle successful registration (e.g., redirect)

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" type="text" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your password" type="password" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Tunggu sebentar
                        </>
                    ) : (
                        "Daftar"
                    )}
                </Button>
            </form>
        </Form>

    )
}

