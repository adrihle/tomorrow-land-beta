/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchTickets } from 'src/redux/actions';
import { iReduxStore, iTicket } from 'src/redux/store.interface';
import { store as reduxStore } from '../../redux/store.store';
import { SVGComponent, TicketComponent } from '../../components';
import InifiniteScroll from 'react-infinite-scroll-component';
import './ticket-list.container.style.scss';

export const TicketListContainer = (): JSX.Element => {
    const [ticketState, setTicketState]=useState<iTicket[]>([]);
    const [indexInferior, setIndexInferior]=useState<number>(0);
    const [indexSuperior, setIndexSuperior]=useState<number>(30);
    const { user, tickets } = useSelector((state: iReduxStore) => state);
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    let current: any;

    useEffect(() => {
        dispatch(actionFetchTickets());
        const unsubscribe = reduxStore.subscribe(() => {
            const previous: any = current;
            current = reduxStore.getState().tickets;
            if (previous !== current){
                const tickets = current.tickets;
                if (tickets.length){
                    setTicketState(tickets.slice(indexInferior,indexSuperior));
                    setIndexInferior(prev=>prev+20);
                    setIndexSuperior(prev=> prev+20);
                } 
            }
        });
        return function clean(){
            unsubscribe();
        }
    },[]);

    const fetchMoreData = () => {
        setTicketState(prev => prev.concat(tickets.tickets.slice(indexInferior, indexSuperior)));
        setIndexInferior(prev=>prev+20);
        setIndexSuperior(prev=> prev+20);
      };

    const Loading = (): JSX.Element => <div>Loading...</div>

    return (
        <main className='ticket-container'>
            <section className='ticket-scroll-container'>
                <section className='ticket-greetins __pop'>
                    <h2>Bievenido de nuevo, {user.name}.👋</h2>
                    <p>Estas son las personas que han comprado entrada</p>
                </section>
                <section className='ticket-scroll'>
                    {!ticketState.length ? (
                    tickets.loading && <Loading />  
                    ):(
                        <InifiniteScroll
                            dataLength={ticketState.length}
                            loader={<Loading />}
                            endMessage={'fin'}
                            next={fetchMoreData}
                            hasMore={true}
                            height={700}

                        >
                            {ticketState.map((ticket, index) => index === 0 ? (
                                <div key={index} ref={scrollRef} className='ticket-element __push'>
                                    <TicketComponent ticket={ticket} />
                                </div>
                            ): (
                                <div key={index} className='ticket-element __push'>
                                    <TicketComponent ticket={ticket} />
                                </div>
                            ))}
                        </InifiniteScroll>
                    )}
                </section>
            <section className="ticket-scroll-top">
                <div onClick={() => (scrollRef as any).current.scrollIntoView()} className='__press'>
                    <SVGComponent type='UP' fill='white' />
                </div>
            </section>
            </section>
        </main>
    )
}