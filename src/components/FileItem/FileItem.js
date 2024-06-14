import { Link, NavLink, useLocation } from "react-router-dom";
import FileDropdown from "../FileDropdown/FileDropdown";

function FileItem({ file }) {
    const location = useLocation();
    const domain = "glos-frontend";
    // todo: choode image placeholder based on type of file
    return (
        <div className="card card-list-item file-item d-flex flex-row mb-2">
            <div className="card-img">
                <img src={`${process.env.PUBLIC_URL}/images/file-light.png`} className="img-fluid rounded-start"/>
            </div>
            <div className="card-body p-2 d-flex justify-content-between gap-2">
                <h6 className="fs-6 text-medium card-title p-0 m-0">
                    <Link to={'/' + domain + '/dashboard/files/file?f=' + (file.rootFullName || file.displayFilename)}>{file.displayFilename}</Link>
                </h6>
                <FileDropdown fileId={file.rootFullName}/>
            </div>
        </div>
    );
}

export default FileItem;