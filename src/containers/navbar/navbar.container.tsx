import './navbar.container.style.scss';
import { SVGComponent } from '../../components';

export const NavbarContainer = (): JSX.Element => {
    return (
        <main className='navbar-container'>
            <section className="navbar-top">
                <div className='__press'><SVGComponent type='MENU' /></div>
                <div className='__press'><SVGComponent type='LOGO' /></div>
            </section>
            <section className="navbar-middle">
                <div className='__press'><SVGComponent type='CUADROS' fill='black' /></div>
                <div className='__press'><SVGComponent type='STUDENT' /></div>
                <div className='__press'><SVGComponent type='DOCUMENT' /></div>
                <div className='__press'><SVGComponent type='GRAPHIC' /></div>
                <div className='__press'><SVGComponent type='NOTE' /></div>
                <div className='__press'><SVGComponent type='HELP' /></div>
            </section>
        </main>
    )
}
