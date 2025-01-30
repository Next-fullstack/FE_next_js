

import RegisterForm from "@/components/RegisterForm"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {

    return (
        <div className="fl  ex min-h-screen flex-col md:flex-row ">
            {/* Left Column - Login Form */}
            <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 md:w-1/2 md:px-8 lg:px-12 xl:px-16">
                <div className="w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Daftar</h1>
                        <p className="text-muted-foreground">Sudah punya akun? <Link href={'/login'} className="font-semibold hover:underline hover:underline-offset-1">Masuk</Link></p>
                    </div>
                    <RegisterForm />
                </div>
            </div>

            {/* Right Column - SVG Image */}
            <div className="hidden md:flex w-full items-center justify-center  p-4 md:w-1/2 md:p-8 lg:p-12 xl:p-16">
                <div className="relative h-48 w-full md:h-full">
                    <Image src="/writing.svg" alt="Writing illustration" fill priority className="object-contain" />
                </div>
            </div>
        </div>
    )
}

