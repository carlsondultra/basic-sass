import { createCustomerIfNull, generateCustomerPortalLink } from "@/helpers/billing";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

import Stripe from 'stripe';
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
    apiVersion: '2023-08-16'
});


export default async function Page() {
    const session = await getServerSession(authOptions)
    await createCustomerIfNull();


    //pull entire user model from database based on current logged in email
    const user = await prisma.user.findFirst({
        where:{
            email: session?.user?.email
        }
    })

    //create customer portal link based on the above user
    const manage_link = await generateCustomerPortalLink(""+user?.stripe_customer_id)

    return (
        <div className="max-w-4xl m-auto w-full px-4">
            <div className="flex flex-col">
                <p className="text-2xl font-medium">Welcome, {session?.user?.name}</p>
                <div className="">
                    <Link href={""+manage_link}>
                        Manage billing
                    </Link>
                </div>
            </div>
        </div>
    )
}