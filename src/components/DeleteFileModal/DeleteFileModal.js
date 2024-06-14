import { connect } from 'react-redux';
import { deleteFile, setFileAccess } from "../../store/thunks/fileThunks";
import Loader from '../../components/Loader/Loader';
import { createRef } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

function DeleteFileModal({ deleteFile, isLoading, currentFile }) {
    const closeBtn = createRef();
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    let fileName = searchParams.get('f');

    const onDelete = () => {
        deleteFile(currentFile.id, currentFile.rootFullName);
        closeBtn.current.click();

        if(fileName) { // if it is the file page
            navigate(-1); // go to prev page
        }
    }

    return (
        <div id="deleteFileModal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete file</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeBtn}></button>
                    </div>
                    <div className="modal-body">
                        {
                            isLoading ? <Loader /> : <p>Are you sure you want to delete this file?</p>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onDelete}>Yes</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.fileReducer.isLoading,
        currentFile: state.fileReducer.currentFile,
    }
};

const mapDispatchToProps = {
    deleteFile
};

export default connect(mapStateToProps, mapDispatchToProps)((DeleteFileModal));