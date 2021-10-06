/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import { actionResetTicketCurrent } from '../../redux/actions';
import { iReduxStore } from 'src/redux';
import { SVGComponent } from '../svg-generator/svg-generator.component';
import './modal.component.style.scss';
import { useEffect, useRef } from 'react';

export const ModalComponent = (): JSX.Element => {
    const { ticket, show, error } = useSelector((state: iReduxStore) => state.ticketCurrent);
    const dispatch = useDispatch();
    const modalRef = useRef<any>()

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    },[modalRef, show]);

    const handleClick = (event: MouseEvent) => {
        if (modalRef.current && !(modalRef.current as any).contains(event.target) && show){
            dispatch(actionResetTicketCurrent());
        } 
    }
   
    return (
        <main className={`modal-container ${(show && !error) ? 'modal-on' : 'modal-off'} __pop`}>
            <section className='modal-container-box' ref={modalRef}>
                <header>
                    <section>
                        <SVGComponent type={ticket?.present ? 'VERDE' : 'ROJO'} />
                        <div>
                            <p>{ticket?.firstName} {ticket?.lastName}</p>
                            <p>{ticket?.present ? 'Ha entrado' : 'No ha entrado'}</p>
                        </div>
                    </section>
                    <span onClick={() => dispatch(actionResetTicketCurrent())} className='__press'>
                        <SVGComponent type='CLOSE' />
                    </span>
                </header>
                <section className='modal-body'>
                    <section className='modal-section-first'>
                        <div>
                            <p className='modal-element-title'>ID</p>
                            <p className='modal-element-description'>{ticket?._id}</p>
                        </div>
                        <div>
                            <p className='modal-element-title'>Nº de ticket</p>
                            <p className='modal-element-description'>{ticket ? ticket.ticket : ''}</p>
                        </div>
                    </section>
                    <section className='modal-section-middle'>
                        <div>
                            <p className='modal-element-title'>Fecha de nacimiento</p>
                            <p className='modal-element-description'>{ticket?.birthdate}</p>
                        </div>
                        <div>
                            <p className='modal-element-title'>Email</p>
                            <p className='modal-element-description'>{ticket?.email}</p>
                        </div>
                        <div>
                            <p className='modal-element-title'>Teléfono</p>
                            <p className='modal-element-description'>{ticket?.phone}</p>
                        </div>
                    </section>
                    <section className='modal-section-last'>
                        <div>
                            <p className='modal-element-title'>Dirección</p>
                            <p className='modal-element-description'>{ticket?.address }</p>
                        </div>
                    </section>
                </section>
            </section>
        </main>
    )
};
