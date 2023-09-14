import { StripePricingTable } from '@/helpers/components'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-w-2xl m-auto px-4 my-2">
      <Link
        className="bg-black ml-auto text-white rounded-md px-2 py-1"
        href={"/sign-in"}
      >
        Sign-In
      </Link>
      <div className="flex flex-col my-4">
        <h1 className="text-5xl font-semibold">Basic SaaS</h1>
        <p className="text-black/80 pb-2">Please subscribe to my basic SaaS.</p>
        <StripePricingTable />
      </div>
    </main>
  )
}
