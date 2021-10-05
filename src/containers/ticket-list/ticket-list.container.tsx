import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchTickets } from 'src/redux/actions';
import { iReduxStore, iTicket } from 'src/redux/store.interface';
import { store as reduxStore } from '../../redux/store.store';
import InifiniteScroll from 'react-infinite-scroll-component';
import './ticket-list.container.style.scss';

export const TicketListContainer = (): JSX.Element => {
    const [ticketState, setTicketState]=useState<iTicket[]>([]);
    const [indexInferior, setIndexInferior]=useState<number>(0);
    const [indexSuperior, setIndexSuperior]=useState<number>(30);
    const { loading, tickets } = useSelector((state: iReduxStore) => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionFetchTickets());
        const unsubscribe = reduxStore.subscribe(() => {
            const tickets = reduxStore.getState().tickets.tickets;
            if (tickets.length){
                setTicketState(tickets.slice(indexInferior,indexSuperior));
                setIndexInferior(prev=>prev+20);
                setIndexSuperior(prev=> prev+20);
            }
        });
        return function clean(){
            unsubscribe();
        }
    },[]);

    const fetchMoreData = () => {
        setTicketState(prev => prev.concat(tickets.slice(indexInferior, indexSuperior)));
        setIndexInferior(prev=>prev+20);
        setIndexSuperior(prev=> prev+20);
      };

    const Loading = (): JSX.Element => <div>Loading...</div>

    return (
        <main className='ticket-container'>
            <section className='ticket-scroll'>
                {!ticketState.length ? (
                 loading && <Loading />  
                ):(
                    <InifiniteScroll
                        dataLength={ticketState.length}
                        loader={<Loading />}
                        endMessage={'fin'}
                        next={fetchMoreData}
                        hasMore={true}
                        height={864}

                    >
                        {ticketState.map((p, index) => <p key={index}>{p.firstName}</p>)}
                    </InifiniteScroll>
                )}
            </section>
        </main>
    )
}