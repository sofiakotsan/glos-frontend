import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import EmailChangeForm from '../../components/EmailChangeForm/EmailChangeForm';
import PhoneChangeForm from '../../components/PhoneChangeForm/PhoneChangeForm';
import PasswordChangeForm from '../../components/PasswordChangeForm/PasswordChangeForm';

function ProfilePage({isLoading, user, errors}) {
    if(isLoading) {
        return <Loader/>
    }

    return (
        <div className="inner-page">
            <div className='pagetitle'>
                <h1>Profile Settings</h1>
            </div>
            <h4 className='mt-3'>General info</h4>
            <div className='mb-1'>Username: <span className='fw-bold'>{user.username}</span></div>
            <div className='mb-1'>First name: <span className='fw-bold'>{user.firstName}</span></div>
            <div className='mb-1'>Last name: <span className='fw-bold'>{user.lastName}</span></div>
            <div className='mb-1'>Gender: <span className='fw-bold'>{user.gender}</span></div>
            <div className='mb-1'>Birth date: <span className='fw-bold'>{user.birthdate}</span></div>
            {/* todo: format birth date */}
            {
                errors && errors?.length ? errors.map(err => <p key={err} className='text-danger'>{err}</p>) : null
            }
            <hr/>
            <h4 className='mt-3'>Email settings</h4>
            <EmailChangeForm/>
            <hr/>
            <h4 className='mt-3'>Phone number settings</h4>
            <PhoneChangeForm/>
            <hr/>
            <h4 className='mt-3'>Password settings</h4>
            <PasswordChangeForm/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        isLoading: state.authReducer.isLoading,
        errors: state.authReducer.errors,
    }
}

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)((ProfilePage));