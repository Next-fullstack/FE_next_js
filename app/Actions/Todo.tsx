"use server"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()




export async function getTodos() {
    try {
        const result = await prisma.todo.findMany({
            orderBy: {
                created_at: 'asc'
            }
        })
        console.log("🚀 ~ getTodos ~ result:", result)
        return result
    } catch (error) {
        console.log(error)
        return [] // Mengembalikan array kosong jika terjadi kesalahan
    } finally {
        await prisma.$disconnect()
    }
}

export async function insertTodos(input: { todo: string }) {
    try {
        const result = await prisma.todo.create({
            data: {
                todo: input.todo,
                done: false
            }
        })
        console.log("🚀 ~ getTodos ~ result:", result)
        return result
    } catch (error) {
        console.log(error)
        return []
    } finally {
        await prisma.$disconnect()
    }
}
export async function deleteTodos(id: string) {
    try {
        const result = await prisma.todo.delete({
            where: {
                id: id
            }
        })
        console.log("🚀 ~ getTodos ~ result:", result)
        return result
    } catch (error) {
        console.log(error)
        return []
    } finally {
        await prisma.$disconnect()
    }
}
export async function updateTodos(id: string) {
    try {
        const result = await prisma.$transaction(async () => {
            const result1 = await prisma.todo.findUnique({
                where: {
                    id: id
                }
            })
            if (!result1) {
                return []
            }
            console.log("🚀 ~ updateTodos ~ result1:", result1)
            if (result1.done == true) {
                const result = await prisma.todo.update({
                    where: {
                        id: id
                    },
                    data: {
                        done: false
                    }
                })
                console.log("🚀 ~ getTodos ~ result:", result)
                return result
            } else if (result1.done == false) {
                const result = await prisma.todo.update({
                    where: {
                        id: id
                    },
                    data: {
                        done: true
                    }
                })
                console.log("🚀 ~ getTodos ~ result:", result)
                return result
            }
        })
        return result

    } catch (error) {
        console.log(error)
        return []
    } finally {
        await prisma.$disconnect()
    }
}
