import './navbar.container.style.scss';
import { SVGComponent } from '../../components';

export const NavbarContainer = (): JSX.Element => {
    return (
        <main className='navbar-container'>
            <section className="navbar-top">
                <div><SVGComponent type='STUDENT' /></div>
                <div><SVGComponent type='LOGO' /></div>
            </section>
            <section className="navbar-middle">
                <div><SVGComponent type='DOCUMENT' fill/></div>
                <div><SVGComponent type='STUDENT' /></div>
                <div><SVGComponent type='DOCUMENT' /></div>
                <div><SVGComponent type='DOCUMENT' /></div>
                <div><SVGComponent type='DOCUMENT' /></div>
                <div><SVGComponent type='DOCUMENT' /></div>
            </section>
        </main>
    )
}
