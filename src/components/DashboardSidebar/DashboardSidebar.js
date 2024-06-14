import { NavLink } from 'react-router-dom';

function DashboardSidebar() {
    return (
        <aside className='sidebar'>
            <ul className='sidebar-nav'>
                <li className='nav-item'>
                    <a className='btn btn-primary ms-2 mb-3' href="#" data-bs-toggle="modal" data-bs-target="#newFileModal">
                        <i className='bi bi-plus sub-menu-special-icon me-2'></i>
                        <span>Upload a file</span>
                    </a>

                    <a className='btn btn-outline-primary ms-2 mb-3' href="#" data-bs-toggle="modal" data-bs-target="#newRepositoryModal">
                        <i className='bi bi-plus sub-menu-special-icon me-2'></i>
                        <span>Add new repository</span>
                    </a>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link collapsed' to='uploaded-files'>
                        <i className='bi bi-file-earmark-text'></i>
                        <span>Uploaded files</span>
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link collapsed' to='repositories'>
                        <i className='bi bi-folder'></i>
                        <span>Repositories</span>
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link collapsed' to='groups'>
                        <i className='bi bi-diagram-3'></i>
                        <span>Groups</span>
                    </NavLink>
                </li>
            </ul>
        </aside>

    );
}

export default DashboardSidebar;