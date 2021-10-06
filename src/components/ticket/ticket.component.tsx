import { iTicket } from '../../redux/store.interface';
import { SVGComponent } from '../svg-generator/svg-generator.component';
import { useDispatch } from 'react-redux';
import { actionAddTicketCurrent } from '../../redux/actions';
import './ticket.component.style.scss';

export const TicketComponent = ({ticket}: iProps): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <main className='ticket-component-container'>
            <section className="ticket-component-info">
                <div className="icon">
                    <SVGComponent type={ticket.present ? 'VERDE' : 'ROJO'} />
                </div>
                <div className="name">
                    <p>{ticket.firstName} {ticket.lastName}</p>
                    <p className='ticket-component-text-light'>{ticket.present ? 'Ha entrado' : 'No ha entrado'}</p>
                </div>
                <div className="id">
                    <p className='ticket-component-text-medium'>ID</p>
                    <p className='ticket-component-text-light'>{ticket._id}</p>
                </div>
                <div className="numero-ticket">
                    <p className='ticket-component-text-medium'>Nº de ticket</p>
                    <p className='ticket-component-text-light'>{ticket.ticket}</p>
                </div>
            </section>
            <section 
                className="ticket-component-options __press"
                onClick={() => dispatch(actionAddTicketCurrent(ticket))}
            >
                <SVGComponent type='DOTS' />
            </section>
        </main>
    )
}

interface iProps {
    ticket: iTicket;
}