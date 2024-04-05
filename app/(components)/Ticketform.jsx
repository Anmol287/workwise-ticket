'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Ticketform = ({ ticket }) => {
    const EDITMODE = ticket._id === "new" ? false : true
    const router = useRouter();
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (EDITMODE) {
            const res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            })
            if (!res.ok) {
                throw new Error("Failed to UpdateTicket")
            }
            router.push("/dashboard")
            router.refresh()
        }
        else {

            const res = await fetch('/api/Tickets', {
                method: "POST",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            })
            if (!res.ok) {
                throw new Error("Failed to Create Ticket")
            }
            router.push("/dashboard")
            router.refresh()
        }

        // console.log("submitted")
    }
    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "Not Started",
        category: "Hardware Problem"
    };

    if (EDITMODE) {
        startingTicketData["title"] = ticket.title
        startingTicketData["description"] = ticket.description
        startingTicketData["priority"] = ticket.priority
        startingTicketData["progress"] = ticket.progress
        startingTicketData["status"] = ticket.status
        startingTicketData["category"] = ticket.category
    }

    const [formData, setFormData] = useState(startingTicketData);
    return (
        <div className='flex justify-center m-2 items-center '>
            <form className='flex flex-col gap-1 md:w-1/2 bg-slate-300 p-6 rounded-lg shadow-lg'
                method='post' onSubmit={handleSubmit}>

                <h3 className='text-center uppercase font-mono text-3xl '>{EDITMODE ? "Update your Ticket" : "Create your Ticket"}</h3>

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    required={true} />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    rows={1}
                    required={true} />
                <label htmlFor="category">Description</label>
                <select
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={formData.category}
                >
                    <option value="Hardware Problem">Hardware Problem</option>
                    <option value="Software Problem">Software Problem</option>
                    <option value="Project Issue">Project Issue</option>
                    <option value="Technical Glitch">Technical Glitch</option>
                </select>

                <label htmlFor="priority">Priority</label>
                <div>
                    <input
                        type="radio"
                        id='priority-1'
                        name='priority'
                        onChange={handleChange}
                        value={1}
                        checked={formData.priority == 1}
                    />
                    <label htmlFor="">1</label>


                    <input
                        type="radio"
                        id='priority-2'
                        name='priority'
                        onChange={handleChange}
                        value={2}
                        checked={formData.priority == 2}
                    />
                    <label htmlFor="">2</label>

                    <input
                        type="radio"
                        id='priority-3'
                        name='priority'
                        onChange={handleChange}
                        value={3}
                        checked={formData.priority == 3}
                    />
                    <label htmlFor="">3</label>

                    <input
                        type="radio"
                        id='priority-4'
                        name='priority'
                        onChange={handleChange}
                        value={4}
                        checked={formData.priority == 4}
                    />
                    <label htmlFor="">4</label>

                    <input
                        type="radio"
                        id='priority-5'
                        name='priority'
                        onChange={handleChange}
                        value={5}
                        checked={formData.priority == 5}
                    />
                    <label htmlFor="">5</label>
                </div>

                <label htmlFor="progress">Progress</label>
                <input type="range"
                    name="progress"
                    id="progress"
                    value={formData.progress}
                    min={0}
                    max={100}
                    onChange={handleChange} />

                <label htmlFor="status">Status</label>
                <select name="status" id="status" onChange={handleChange} value={formData.status}>
                    <option value="Not Started">Not Started</option>
                    <option value="Started">Started</option>
                    <option value="Pending">Pending</option>
                    <option value="done">Done</option>
                </select>

                <input type="submit" className='btn text-white md:w-1/4 ml-auto' value={EDITMODE ? "Update Ticket" : "Create Ticket"} />
            </form>
        </div>
    )
}

export default Ticketform;
