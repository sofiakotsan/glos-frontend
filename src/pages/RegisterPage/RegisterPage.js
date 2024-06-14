
import { Fragment } from "react";
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { register } from "../../store/thunks/authThunks";
import Loader from '../../components/Loader/Loader';
import { Navigate } from 'react-router-dom';

const RegisterPage = ({registerUser, isLoading, isAuth, userErrors}) => {
	const domain = "glos-frontend";

	const {
		register,
		formState: { errors, isValid, },
		handleSubmit,
		reset,
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = (data) => {
		// registerUser({

		// });
		data.birthdate = data.birthdate + "T00:00:00.000"
		data.confirmPassword = data.password;
		console.log(data);
		registerUser(data);
		// reset();
	}

	const clearView = false;

	if(isLoading) {
		return <Loader/>
	}

	if(isAuth) {
		return <Navigate to={`/${domain}/dashboard`}/>
	}

	return (
		<div className="row my-3">
			<div className=" container justify-content-center align-items-center  col-lg-4 col-md-6  col-sm-6 bg-light rounded border border-2 border-color-primary  p-3 overflow-auto shadow p-3 mb-5 bg-color-primary rounded ">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2 className=" my-2 text-center ">Форма реєстрації користувача</h2>
					{
						userErrors?.length ? userErrors.map(err => <p key={err} className="text-danger text-center">{err}</p>) : null
					}
					{/* Username begin */}
					<Fragment>
						<label className="form-label h5">
							Нік*
						</label>
						<input type="text" name="username"
							className="form-control" {...register("username", {
								required: "Обов'язкове поле",
								pattern: {
									value: /[A-Za-z0-9]{5,}/,
									message: "Дозволено тільки літери та цифри 5 мінімум",
								},
							})} />
						<div style={errors.username ? { height: 40 } : { height: 2 }}>
							{errors.username && <p style={{ color: 'red' }}>{errors.username.message || "Error!"}</p>}
						</div>
					</Fragment>
					{/* Username end*/}

					{/* UserEmail begin */}
					<Fragment>
						<label className="form-label h5">
							Електронна пошта*
						</label>
						<input type="text" name="email"
							className="form-control" {...register("email", {
								required: "Обов'язкове поле",
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: "user@email.com",
								},
							})} />
					</Fragment>
					<div style={errors.email ? { height: 40 } : { height: 2 }} >
						{errors.email && <p style={{ color: 'red' }}>{errors.email.message || "Error!"}</p>}
					</div>
					{/* UserEmail end*/}

					{/* PhoneNumber begin */}
					<Fragment>
						<label className="form-label h5">
							Номер телефону*
						</label>
						<input type="text" name="phoneNumber"
							className="form-control"  {...register("phoneNumber", {
								required: "Обов'язкове поле",
								pattern: {
									value: /(\+\d{1,4}[-.\s]?)(\(\d{1,}\)[-\s]?|\d{1,}[-.\s]?){1,}[0-9\s]/,
									message: "Invalid phone number format.",
								}
							})} />
					</Fragment>
					<div style={errors.phoneNumber ? { height: 40 } : { height: 2 }} >
						{errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message || "Error!"}</p>}
					</div>
					{/* PhoneNumber end*/}

					{/* password begin */}
					<Fragment>
						<label className="form-label h5">
							Пароль*
						</label>
						<input type="password" name="password"
							className="form-control"  {...register("password", {
								required: "Обов'язкове поле",
								pattern: {
									value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?@#$%^&*(),\.<>\[\]{}"'|\\:;`~+\-*\/]).{8,}$/,
									message: 'Password should be at least 8 symbols long, and should contain lowercase and uppercase letters, numbers and special symbols.'
								}
							})} />
					</Fragment>
					<div style={errors.password ? { height: 40 } : { height: 2 }} >
						{errors.password && <p style={{ color: 'red' }}>{errors.password.message || "Error!"}</p>}
					</div>
					{/* password end*/}

					{/* firstName begin */}
					<Fragment>
						<label className="form-label h5">
							Ім'я
						</label>
						<input type="text" name="firstName"
							className="form-control" {...register("firstName", {
								//required: "Обов'язкове поле",
								pattern: {
									value: /[A-Za-z]{2,}/,
									message: "Дозволено тільки літери 2 мінімум",
								},
							})} />
						<div style={errors.firstName ? { height: 40 } : { height: 2 }}>
							{errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message || "Error!"}</p>}
						</div>
					</Fragment>
					{/* firstName end*/}

					{/* lastName begin */}
					<Fragment>
						<label className="form-label h5">
							Прізвище
						</label>
						<input type="text" name="lastName"
							className="form-control" {...register("lastName", {
								//required: "Обов'язкове поле",
								pattern: {
									value: /[A-Za-z]{2,}/,
									message: "Дозволено тільки літери 2 мінімум",
								},
							})} />
						<div style={errors.lastName ? { height: 40 } : { height: 2 }}>
							{errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message || "Error!"}</p>}
						</div>
					</Fragment>
					{/* lastName end*/}

					{/* birthdate begin */}
					<Fragment>
						<label className="form-label h5">
							Гендер
						</label>
						<select className="form-control"
							{...register("gender", {
								required: "Обов'язкове поле",
							})}>
							<option value={''} disabled={true} selected>Оберіть варіант</option>
							<option value={'male'}>Чоловік</option>
							<option value={'female'}>Жінка</option>
							<option value={'other'}>Інше</option>
						</select>

						{/* <input type="text" name="gender"
              className="form-control" placeholder="male|female|other" {...register("gender", {
                //required: "Обов'язкове поле",
                pattern: {
                  value: /[male,female,other]/,
                  message: "Дозволено male|female|other",
                },
              })} /> */}
						<div style={errors.gender ? { height: 40 } : { height: 2 }}>
							{errors.gender && <p style={{ color: 'red' }}>{errors.gender.message || "Error!"}</p>}
						</div>
					</Fragment>
					{/* gender end*/}

					{/* birthdate */}
					<Fragment>
						<label className="form-label h5">
							День народження
						</label>
						<input className="form-control" type='date' {...register("birthdate", {
							required: "Обов'язкове поле",
						})} />

						{/* <input type="text" name="birthdate"
              className="form-control" placeholder="1996.03.23" {...register("birthdate", {
                //required: "Обов'язкове поле",
                pattern: {
                  value: /[0-9]/,
                  message: "Дозволено 1996.03.23",
                },
              })} /> */}
						<div style={errors.birthdate ? { height: 40 } : { height: 2 }}>
							{errors.birthdate && <p style={{ color: 'red' }}>{errors.birthdate.message || "Error!"}</p>}
						</div>
					</Fragment>
					{/* birthdate end*/}





					<input type="submit" disabled={!isValid} className="btn btn-primary " />

				</form>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.authReducer.isLoading,
		isAuth: state.authReducer.isAuth,
		userErrors: state.authReducer.errors,
	}
}

const mapDispatchToProps = {
	registerUser: register
};

export default connect(mapStateToProps, mapDispatchToProps)((RegisterPage));