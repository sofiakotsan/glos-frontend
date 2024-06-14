import { NavLink } from 'react-router-dom';

function HeaderProfileDropdown({ user, userImage }) {
    const domain = "glos-frontend";
    console.log(user)
    return (
        <div className='header-profile'>
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                {/* <img src={userImage} className="rounded-circle" /> */}
                <img src={`${process.env.PUBLIC_URL}/images/user.png`} className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                    {user.firstName} {user.lastName}
                </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                    <h6>{user.firstName} {user.lastName}</h6>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <NavLink className="dropdown-item d-flex align-items-center" 
                        to={`/${domain}/dashboard/profile`}>
                        <i className="bi bi-person"></i>
                        <span>Profile Settings</span>
                    </NavLink>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li>
                    <NavLink className="dropdown-item d-flex align-items-center" 
                    to={`/${domain}/logout`}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Log Out</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default HeaderProfileDropdown;