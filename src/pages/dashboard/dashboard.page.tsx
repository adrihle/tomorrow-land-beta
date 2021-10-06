import { NavbarContainer, TicketListContainer } from '../../containers';
import { ModalComponent } from '../../components';
import './dashboard.page.style.scss';
import React from 'react';

export const DashboardPage = () => {

    return (
        <main className='dashboard-container __pop'>
            <ModalComponent />
            <NavbarContainer />
            <TicketListContainerMemo />
        </main>
    )
};

const TicketListContainerMemo = React.memo(() => {
    return <TicketListContainer />
})