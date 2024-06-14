import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import Loader from '../Loader/Loader';
import { Navigate } from 'react-router-dom';
import { changePassword, login } from '../../store/thunks/authThunks';
import { createRef, useEffect } from 'react';

function PasswordChangeForm({ isLoading, user, errors, changePassword }) {
    const { register, handleSubmit, reset, setError, formState: { errors: formErrors } } = useForm();
    const openModalBtn = createRef();
    const onFormSubmit = (data) => {
        if(data.password != data.confirmPassword) {
            setError("confirmPassword", { type: "custom", message: "Password and confirm password don't match." })
            return;
        }
        changePassword(data.password, data.confirmPassword);
        openModalBtn.current.click();
    };

    return (
        <div className="col-12 col-md-8  col-lg-6 login-form">
            {
                isLoading ? <Loader /> :
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="password" className="">New password:</label>
                            <input type="password" className="form-control"
                                {...register("password", {
                                    required: "This field is required.",
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?@#$%^&*(),\.<>\[\]{}"'|\\:;`~+\-*\/]).{8,}$/,
                                        message: 'Password should be at least 8 symbols long, and should contain lowercase and uppercase letters, numbers and special symbols.'
                                    }
                                })} />
                            {formErrors.password ?
                                <small className="text-danger d-block">{formErrors.password.message}</small>
                                : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="">Confirm password:</label>
                            <input type="password" className="form-control"
                                {...register("confirmPassword", {
                                    required: "This field is required.",
                                })} />
                            {formErrors.confirmPassword ?
                                <small className="text-danger d-block">{formErrors.confirmPassword.message}</small>
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
    changePassword
};

export default connect(mapStateToProps, mapDispatchToProps)((PasswordChangeForm));