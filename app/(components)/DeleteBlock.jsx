"use client"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React from 'react'

export const DeleteBlock = ({ id }) => {
  const router = useRouter()
  const deleteTicket = async () => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`,
      {
        method: "DELETE"
      })
    if (res.ok) {
      router.refresh();
    }
  }
  return (
    <FontAwesomeIcon icon={faX}
      className='text-red-500 text-xl hover:cursor-pointer hover:scale-110 hover:text-red-700'
      onClick={deleteTicket} />
  )
}
