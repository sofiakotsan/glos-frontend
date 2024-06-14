import { NavLink } from "react-router-dom";
import RepositoryDropdown from "../RepositoryDropdown/RepositoryDropdown";

function RepositoryItem({ repository }) {
    const domain = "glos-frontend";
    return (
        <div className="card card-list-item repository-item d-flex flex-row mb-2">
            <div className="card-img">
                <img src={`${process.env.PUBLIC_URL}/images/folder-light.png`} className="img-fluid rounded-start"/>
            </div>
            <div className="card-body p-2 d-flex justify-content-between align-items-center gap-2">
                <div>
                    <h6 className="fs-6 text-medium card-title p-0 m-0">
                        <NavLink to={`/${domain}/dashboard/repositories/repository?r=` + repository.rootFullName}>{repository.displayName}</NavLink>
                    </h6>
                    <small className="text-muted py-1">{repository.description}</small>
                </div>
                <RepositoryDropdown repositoryId={repository.rootFullName}/>
            </div>
        </div>
    );
}

export default RepositoryItem;