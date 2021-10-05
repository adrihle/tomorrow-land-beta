import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchTickets } from 'src/redux/actions';
import { iReduxStore, iTicket } from 'src/redux/store.interface';
import './ticket-list.container.style.scss';

export const TicketListContainer = (): JSX.Element => {
    const { tickets, loading } = useSelector((state: iReduxStore) => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionFetchTickets());
    })

    const Loading = (): JSX.Element => <div>Loading...</div>

    return (
        <main className='ticket-container'>
            <section className='ticket-scroll'>
                {loading ? (
                 <Loading />  
                ):(
                    tickets.length ? (
                        tickets.map((ticket: iTicket) => {
                            return <p>{ticket.firstName}</p>
                        })
                    ):(
                        <Loading /> 
                    )
                )}
            </section>
        </main>
    )
}