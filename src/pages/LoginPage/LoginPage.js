import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

function LoginPage() {

    return (
        <main>
            <section className="section offer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                            <h3>Login</h3>
                            <LoginForm/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
    );
  }
  
  export default LoginPage;