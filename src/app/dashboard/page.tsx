import { createCheckoutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from "@/helpers/billing";
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
        where: {
            email: session?.user?.email
        }
    })

    //create customer portal link based on the above user
    const manage_link = await generateCustomerPortalLink("" + user?.stripe_customer_id)

    const hasSub = await hasSubscription();
    const checkout_link = await createCheckoutLink("" + user?.stripe_customer_id)

    return (
        <div className="max-w-4xl m-auto w-full px-4">
            <div className="flex flex-col">
                <p className="text-2xl font-medium">Welcome, {session?.user?.name}</p>
                <div className="py-4">
                    <Link  className="bg-black ml-auto text-white rounded-md px-2 py-1" href={"" + manage_link}>
                        Manage billing
                    </Link>
                </div>
                <div className="">
                    {hasSub ? <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium">
                        Subscribed
                    </div> :
                        <div className="p-6 rounded-md border-zinc-400 border shadow-sm font-medium flex items-center gap-2">
                            Free Plan
                            <Link className="bg-black ml-auto text-white rounded-md px-2 py-1" href={"" + checkout_link}>Upgrade</Link>
                        </div>}
                </div>
            </div>
        </div>
    )
}