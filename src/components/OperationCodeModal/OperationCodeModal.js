import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { ACCESS_TYPES } from "../../helpers/constants";
import { addNewFile } from "../../store/thunks/fileThunks";
import Loader from '../../components/Loader/Loader';
import { createRef, useEffect } from 'react';
import { executeOperation } from '../../store/thunks/authThunks';

function OperationCodeModal({ isLoading, errors, executeOperation }) {
    const { register, handleSubmit, reset, formState: { errors: formErrors } } = useForm();
    const closeBtn = createRef();

    const onFormSubmit = (data) => {
        executeOperation(data.code);
        closeBtn.current.click();
    };

    useEffect(() => {
        if(errors?.length > 0) closeBtn.current.click();
    }, [errors]);

    const resetForm = () => {
        reset({
            code: null
        });
    }

    return (
        <div id="operationCodeModal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm change</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeBtn} onClick={resetForm}></button>
                    </div>
                    <div className="modal-body">
                        {
                            isLoading ? <Loader /> :
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <p>Please enter the confirmation code that you should receive on your email.</p>
                                <div className="mb-3">
                                    <label htmlFor="code" className="">Confirmation code:</label>
                                    <input type="text" className="form-control"
                                        {...register("code", {
                                            required: "This field is required.",
                                        })} />
                                    {formErrors.code ?
                                        <small className="text-danger d-block">{formErrors.code.message}</small>
                                        : null}
                                </div>
                            </form>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit(onFormSubmit)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.authReducer.isLoading,
        errors: state.authReducer.errors,
    }
}

const mapDispatchToProps = {
    executeOperation
};

export default connect(mapStateToProps, mapDispatchToProps)((OperationCodeModal));