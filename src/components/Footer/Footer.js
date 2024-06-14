import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

function Footer() {
    const domain = "glos-frontend";

    return (
        <footer className='site-footer accent-bg'>
            <nav className="navbar navbar-expand navbar-light py-5 d-block">
                <div className="container d-flex flex-wrap justify-content-between">
                    <NavLink to={`/${domain}/`} className="d-flex justify-content-center justify-content-lg-start col-12 col-lg-2 align-items-center">
                        <Logo className="logo" />
                    </NavLink>

                    <div className="d-flex justify-content-center justify-content-lg-end align-items-center col-12 col-lg-10">
                        <ul className="navbar-nav text-center d-flex flex-wrap justify-content-center justify-content-lg-end column-gap-3 pt-3 pt-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/${domain}/`}>Головна</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/${domain}/features`}>Наші переваги</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/${domain}/contacts`}>Контакти</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/${domain}/terms-and-conditions`}>Правила користування</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='container text-muted py-3 justify-content-center justify-content-lg-start'>Copyright © 2024 GLOS</div>
            </nav>
        </footer>
    );
}

export default Footer;