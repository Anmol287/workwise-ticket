import React from 'react'
import { DeleteBlock } from './DeleteBlock'
import { PriorityDisplay } from './PriorityDisplay'
import { ProgressDisplay } from './ProgressDisplay'
import { StatusDisplay } from './StatusDisplay'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from '@fortawesome/free-solid-svg-icons'
export const TicketCard = ({ ticket }) => {
    const options = {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const formatdate = new Date(ticket.createdAt).toLocaleDateString("en-US", options);
    return (
        <div className='flex flex-col bg-slate-200 rounded-md shadow-xl p-3 m-2'>
            <div className='flex mb-3'>
                <PriorityDisplay priority={ticket.priority} />
                <div className='ml-auto '>
                    <Link href={`/ticketpage/${ticket._id}`}
                        style={{ display: "contents" }}>
                        <FontAwesomeIcon icon={faEdit} className="icon hover:scale-125 text-blue-500" />
                    </Link>
                </div>
                <div className='ml-6'>
                    <DeleteBlock id={ticket._id} />
                </div>
            </div>
            <h4>{ticket.title}</h4>
            <hr className='h-px border-0 bg-black mb-2' />
            <p className='whitespace-pre-wrap '>{ticket.description}</p>

            <div className='flex-grow'></div>
            <div className='flex mt-2'>
                <div className='flex flex-col'>
                    <p className='text-sm my-1 font-semibold'>{formatdate}</p>
                    <ProgressDisplay progress={ticket.progress} />
                </div>
                <div className='ml-auto flex items-end '>
                    <StatusDisplay status={ticket.status} />
                </div>
            </div>
        </div>
    )
}
