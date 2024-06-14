

function ErrorMessageModal({ message }) {
    return (
        <div id="errorMessageModal" className="modal" tabIndex="-1">
            <button id="errorMessageBtn" type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#errorMessageModal"></button>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Error</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <p id="errorMessage" className="text-danger text-center">{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessageModal;