import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"



export default async function Page() {
    const session = await getServerSession(authOptions)

    return (
        <div className="max-w-4xl m-auto w-full px-4">
            <div className="flex flex-col">
                <p className="text-2xl font-medium">Welcome, {session?.user?.name}</p>
            </div>
        </div>
    )
}