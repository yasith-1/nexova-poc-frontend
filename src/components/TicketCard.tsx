import React from 'react'

export interface ticketProps {
    title: String
    count: number
}

function TicketCard(props: ticketProps) {
    return (
        <>
            <p className="text-lg font-medium text-gray-600 mb-1">{props.title}</p>
            <p className="text-3xl font-bold text-gray-900">{props.count}</p>
        </>
    )
}

export default TicketCard