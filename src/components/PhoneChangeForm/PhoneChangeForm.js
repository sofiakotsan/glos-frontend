import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import Loader from '../Loader/Loader';
import { Navigate } from 'react-router-dom';
import { changePhoneNumber, login } from '../../store/thunks/authThunks';
import { createRef, useEffect } from 'react';

function PhoneChangeForm({ isLoading, user, errors, changePhoneNumber }) {
    const { register, handleSubmit, reset, formState: { errors: formErrors } } = useForm();
    const openModalBtn = createRef();
    const onFormSubmit = (data) => {
        changePhoneNumber(user.phoneNumber, data.phoneNumber);
        openModalBtn.current.click();
    };

    return (
        <div className="col-12 col-md-8  col-lg-6 login-form">
            {
                isLoading ? <Loader /> :
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <p>Your current phone number is: <span className='fw-bold'>{user.phoneNumber}</span></p>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="">New phone number:</label>
                            <input type="text" className="form-control"
                                {...register("phoneNumber", {
                                    required: "This field is required.",
                                    pattern: {
                                        value: /(\+\d{1,4}[-.\s]?)(\(\d{1,}\)[-\s]?|\d{1,}[-.\s]?){1,}[0-9\s]/,
                                        message: "Invalid phone number format.",
                                    }
                                })} />
                            {formErrors.phoneNumber ?
                                <small className="text-danger d-block">{formErrors.phoneNumber.message}</small>
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
    changePhoneNumber
};

export default connect(mapStateToProps, mapDispatchToProps)((PhoneChangeForm));