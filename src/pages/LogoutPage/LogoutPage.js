import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../../store/thunks/authThunks';

function LogoutPage({isAuth, logout}) {
    const domain = "glos-frontend";
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate(`/${domain}`);
    }, []);

    if(!isAuth) {
        return <Navigate to={`/${domain}`}/>
    }

    return (
        <main>
            <section className="section offer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                            <h2>Logging out...</h2>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
    }
}

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)((LogoutPage));