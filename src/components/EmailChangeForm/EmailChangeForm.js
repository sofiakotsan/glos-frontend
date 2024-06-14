import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import Loader from '../../components/Loader/Loader';
import { Navigate } from 'react-router-dom';
import { changeEmail, login } from '../../store/thunks/authThunks';
import { createRef, useEffect } from 'react';

function EmailChangeForm({ isLoading, user, errors, changeEmail }) {
    const { register, handleSubmit, reset, formState: { errors: formErrors } } = useForm();
    const openModalBtn = createRef();
    const onFormSubmit = (data) => {
        changeEmail(user.email, data.email);
        openModalBtn.current.click();
    };

    return (
        <div className="col-12 col-md-8  col-lg-6 login-form">
            {
                isLoading ? <Loader /> :
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <p>Your current email is: <span className='fw-bold'>{user.email}</span></p>
                        <div className="mb-3">
                            <label htmlFor="email" className="">New email:</label>
                            <input type="email" className="form-control"
                                {...register("email", {
                                    required: "This field is required.",
                                })} />
                            {formErrors.email ?
                                <small className="text-danger d-block">{formErrors.email.message}</small>
                                : null}
                        </div>
                        <div className=''>
                            <button className='btn btn-primary'>Save</button>
                        </div>
                        <div ref={openModalBtn} className='d-none' data-bs-toggle="modal" data-bs-target="#operationCodeModal"></div>
                    </form>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.authReducer.isLoading,
        user: state.authReducer.user,
        errors: state.authReducer.errors,
    }
}

const mapDispatchToProps = {
    changeEmail
};

export default connect(mapStateToProps, mapDispatchToProps)((EmailChangeForm));