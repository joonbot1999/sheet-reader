'use client'

import Link from "next/link"

export default function NavbarComponent() {
    return (
        <div className="flex justify-evenly bg-slate-500">
            <div>
                <Link href="/" className="text-stone-200">Home</Link>
            </div>
            <div>
                <Link href="/post" className="text-stone-200">Post</Link>
            </div>
            <div>
                <Link href="/delete" className="text-stone-200">Delete</Link>
            </div>
        </div>
    )
}