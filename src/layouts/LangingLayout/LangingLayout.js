import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';

function LandingLayout() {
    return (
        <>
            <Header />
            <Outlet/>
            <Footer />
            <ErrorMessageModal/>
        </>
        
    );
  }
  
  export default LandingLayout;