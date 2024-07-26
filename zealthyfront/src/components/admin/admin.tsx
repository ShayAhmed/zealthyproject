import { useEffect, useState } from "react";
import { fetchTicketsData } from "../../utils/request";
import { Container } from "react-bootstrap";
import { Ticket } from "../../utils/Ticket";
import TicketItem from "./TicketItem";


const Admin = () => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTickets(page);
        }, [page]);

    const fetchTickets = async (pageNumber: number) => {
        try {
            const response = await fetchTicketsData(pageNumber);
            console.log('res', response);
            const sorted_tickets = response
            .sort((a:Ticket, b:Ticket) => {
                return +new Date(b.created) - +new Date(a.created);
            });
            setTickets(sorted_tickets);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    return (
        <Container className='mt-4'>
                {tickets.map((ticket: Ticket) => (
                    <TicketItem className='border' ticket_data={ticket}/>
                ))}
        </Container>
    );

}

export default Admin    