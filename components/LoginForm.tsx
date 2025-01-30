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



export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true)
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL
            if (!apiUrl) {
                throw new Error('API URL not configured')
            }

            console.log('Calling API:', `${apiUrl}/auth/login`) // Debug log

            const result = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            // Check content type before parsing
            const contentType = result.headers.get("content-type")
            if (!contentType?.includes("application/json")) {
                throw new Error(`Invalid response type: ${contentType}`)
            }

            // Handle empty response body
            if (result.status === 204) {  // No content
                throw new Error('No response content received.')
            }

            if (!result.ok) {
                const errorData = await result.json();
                console.error('Login failed:', errorData);
                return;
            }

            // Safely parse the JSON response
            let responseData = null;
            try {
                responseData = await result.json();
            } catch (parseError) {
                console.error('Failed to parse JSON response:', parseError);
                return;
            }

            if (responseData?.token) {
                document.cookie = `token=${responseData.token}; path=/; expires=${new Date(Date.now() + responseData.expiresIn).toUTCString()}; SameSite=Strict`;
                window.location.href = '/';
            } else {
                console.error('Invalid token received:', responseData);
            }

        } catch (error) {
            console.error('Login error:', error)
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
                                <Input placeholder="Enter your username" type="text" disabled={isLoading} {...field} />
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
                        "Masuk"
                    )}
                </Button>
            </form>
        </Form>

    )
}

