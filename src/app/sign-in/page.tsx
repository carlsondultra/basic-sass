"use client"

import { signIn } from 'next-auth/react'

export default async function Page() {
    return (
        <div className="w-full min-h-screen grid place-items-center">
            {/* Sign In Box */}
            <div className="max-w-xs w-full border border-zinc-200 shadow shadow-sm flex flex-col gap-4 p-6">
                <p className="text-2xl font-medium">Sign In</p>

                <button
                    onClick={() => signIn('discord', {"callbackUrl": "/dashboard"})} 
                    className="px-4 py-2 bg-violet-500 text-white font-medium rounded-lg">
                    Sign in with Discord
                </button>
            </div>
        </div>
    )
}