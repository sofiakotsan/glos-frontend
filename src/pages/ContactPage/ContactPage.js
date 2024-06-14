import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

function ContactPage() {
  const [isMailSent, setMailSent] = useState(false);

  const {
    register,
    formState: { errors, isValid, },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    sendEmail(data.fullname, data.email, data.textarea);
    setMailSent(true);
    reset();
  }

  const sendEmail = async (name, email, text) => {
    let bodyText = "Name: " + name + "<br/>";
    bodyText += "Email: " + email + "<br/>";
    bodyText += "Message: " + text;

    let a = {
      SecureToken: "70037182-439b-49a0-854e-19dfc282b39a",
      To: 'glosstorage@outlook.com',
      From: "glosstorage@outlook.com",
      Subject: "New message from the contact form.",
      Body: bodyText
    };
    a.nocache = Math.floor(1e6 * Math.random() + 1);
    a.Action = "Send";

    const rawResponse = await fetch('https://smtpjs.com/v3/smtpjs.aspx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(a)
    });
    console.log(await rawResponse.text());
  }

  return (
    <>
      <div className="d-flex justify-content-center row  my-3 ">

        <div className=" d-flex  justify-content-center align-items-center col-lg-4
       col-md-6  col-sm-6  bg-light rounded border border-2 border-color-primary  p-3 overflow-auto shadow p-3 mb-5 bg-color-primary rounded ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100 my-3">
            <h2 className=" my-2 text-center ">Є питання? Напишіть нам!</h2>
          {
            isMailSent ? <p className="text-success">Ваше повідомлення було успішно надісланою</p> : null
          }
            {/* Fullname begin */}
            <div>
              <label className="form-label h5 my-3">
                Повне ім'я*
              </label>
              <input type="text" name="fullname"
                className="form-control" {...register("fullname", {
                  required: "Обов'язкове поле",
                  pattern: {
                    value: /[A-Za-z]{3,}/,
                    message: "Дозволено тільки літери",
                  },
                })} />
              <div style={errors.fullname ? { height: 40 } : { height: 2 }}>
                {errors.fullname && <p style={{ color: 'red' }}>{errors.fullname.message || "Error!"}</p>}
              </div>
            </div>
            {/* Fullname end*/}

            {/* UserEmail begin */}
            <Fragment>
              <label className="form-label h5 my-3" htmlFor="formControlInputEmail">
                Електронна пошта*
              </label>
              <input type="email" name="email"
                className="form-control" id="formControlInputEmail" {...register("email", {
                  required: "Обов'язкове поле",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "name@example.com",
                  },
                })} />
            </Fragment>
            <div style={errors.email ? { height: 40 } : { height: 2 }} >
              {errors.email && <p style={{ color: 'red' }}>{errors.email.message || "Error!"}</p>}
            </div>
            {/* UserEmail end*/}

            {/* Textmessage  start*/}
            <Fragment>
              <label className="form-label h5 my-3">
                Текст повідомлення
              </label>

              <textarea className="form-control" rows="6" id="formControlTextarea"
                {...register("textarea", {
                  required: "Обов'язкове поле",
                  pattern: {
                    value: /[A-Za-z0-9]{5,500}/,
                    message: "Дозволено тільки літери і цифри  до 500 символів",
                  },
                })} />
              <div style={errors.textarea ? { height: 40 } : { height: 2 }}>
                {errors.textarea && <p style={{ color: 'red' }}>{errors.textarea.message || "Error!"}</p>}
              </div>
            </Fragment>

            {/*  Textmessage end*/}

            <input type="submit" disabled={!isValid} className="btn btn-primary my-3 col-lg-4
       col-md-6  col-sm-6"/>

          </form>
        </div>


        <div className="d-flex   mx-5 justify-content-center align-items-center col-lg-3 order-lg-2 col-md-6 order-md-first col-sm-6 order-sm-first  bg-light rounded border border-2 border-color-primary  p-3 overflow-auto shadow p-3 mb-5 bg-color-primary rounded rounded-circle ">
          <Logo className="logo bg-primary bg-opacity-25  rounded-circle p-3 w-100 h-100" />

        </div>


      </div>

    </>
  );


}
export default ContactPage