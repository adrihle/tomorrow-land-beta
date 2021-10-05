import { NavbarContainer, TicketListContainer } from '../../containers';
import './dashboard.page.style.scss';

export const Dashboard = () => {

    return (
        <main className='dashboard-container'>
            <NavbarContainer />
            <TicketListContainer />
        </main>
    )
};