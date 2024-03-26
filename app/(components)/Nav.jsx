"use client"
import { faHome, faSignOut, faTicket, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { getSession, signOut, useSession } from "next-auth/react";


const Nav = () => {
    const { data: session, status } = useSession();

    // Check if session exists and contains user data
    const isLoggedIn = session && session.user && session.user.username;
    console.log(session)

    return (
        <nav className="flex justify-between bg-teal-800 p-6">
            <div className="flex items-center space-x-4">

                <Link href="/dashboard">
                    <FontAwesomeIcon icon={faHome} className="icon hover:scale-150 text-white" />
                </Link>
                <Link href="/ticketpage/new">
                    <FontAwesomeIcon icon={faTicket} className="icon hover:scale-150 text-white w-10" />
                </Link>
            </div>
            <div className="flex justify-between">

                <FontAwesomeIcon icon={faUser} className="icon hover:scale-150 mr-2 text-white" />
                <p className="text-default-text">{`Welcome, ${session?.user?.username}`}</p>
                <button><FontAwesomeIcon icon={faSignOut} className="icon hover:scale-125 text-white mx-4" onClick={() => signOut()} /></button>
            </div>
        </nav>
    )
}

export default Nav
