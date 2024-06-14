import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import Loader from '../../components/Loader/Loader';
import { Navigate } from 'react-router-dom';
import { login } from '../../store/thunks/authThunks';

function LoginForm({ isLoading, isAuth, login, errors }) {
    const domain = "glos-frontend";
    const { register, handleSubmit, reset, formState: { errors: formErrors } } = useForm();

    const onFormSubmit = (data) => {
        console.log(data);
        login(data.login, data.password);
    };

    if(isAuth) {
        return <Navigate to={`/${domain}/dashboard`}/>
    }

    return (
        <div className="col-12 col-md-8  col-lg-6 login-form">
            {
                errors && errors?.length ? errors.map(err => <p key={err} className=' text-center text-danger'>{err}</p>) : null
            }
            {
                isLoading ? <Loader /> :
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="login" className="">Login</label>
                            <input type="text" className="form-control"
                                {...register("login", {
                                    required: "This field is required.",
                                })} />
                            {formErrors.login ?
                                <small className="text-danger d-block">{formErrors.login.message}</small>
                                : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="">Password</label>
                            <input type="password" className="form-control"
                                {...register("password", {
                                    required: "This field is required.",
                                })} />
                            {formErrors.password ?
                                <small className="text-danger d-block">{formErrors.password.message}</small>
                                : null}
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-primary'>Login</button>
                        </div>
                    </form>
            }

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.authReducer.isLoading,
        isAuth: state.authReducer.isAuth,
        errors: state.authReducer.errors,
    }
}

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)((LoginForm));