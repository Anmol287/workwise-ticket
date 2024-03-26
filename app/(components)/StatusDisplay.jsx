import React from 'react'

export const StatusDisplay = ({ status }) => {
    const getColor = (status) => {
        let color = "bg-slate-700"

        switch (status.toLowerCase()) {
            case "done":
                color = "bg-green-200"
                return color;
            case "started":
                color = "bg-yellow-200"
                return color;
            case "not started":
                color = "bg-red-500"
                return color;
            case "pending":
                color = "bg-red-300"
                return color;
        }
        return color;
    }
    return (
        <span className={`inline-block rounded-full px-2 text-sm font-bold text-gray-700  ${getColor(status)}`}>
            {status}
        </span>
    )
}
