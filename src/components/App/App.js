import React, {useEffect} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/css/theme.css';
import '../../assets/css/style.css';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { initialize } from '../../store/thunks/appThunks';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import HomePage from '../../pages/HomePage/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../../pages/DashboardPage/DashboardPage.js';
import AllFilesPage from '../../pages/AllFilesPage/AllFilesPage.js';
import LandingLayout from '../../layouts/LangingLayout/LangingLayout.js';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout.js';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.js';
import AllRepositoriesPage from '../../pages/AllRepositoriesPage/AllRepositoriesPage.js';
import RepositoryFilesPage from '../../pages/RepositoryFilesPage/RepositoryFilesPage.js';
import GroupsPage from '../../pages/GroupsPage/GroupsPage.js';
import SearchPage from '../../pages/SearchPage/SearchPage.js';
import FilePage from '../../pages/FilePage/FilePage.js';
import LoginPage from '../../pages/LoginPage/LoginPage.js';
import RegisterPage from '../../pages/RegisterPage/RegisterPage.js';
import ContactPage from '../../pages/ContactPage/ContactPage.js';
import LogoutPage from '../../pages/LogoutPage/LogoutPage.js';
import FeaturesPage from '../../pages/FeaturesPage/FeaturesPage.js';

const App = ({ isInitialized, initialize, user }) => {
    const domain = "glos-frontend";

    useEffect(() => {
        if (!isInitialized) initialize();
    }, []);

    if (!isInitialized) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LandingLayout/>}>
                    <Route path={`/${domain}/`} element={<HomePage />} />
                    <Route path={`/${domain}/login`} element={<LoginPage />} />
                    <Route path={`/${domain}/logout`} element={<LogoutPage />} />
                    <Route path={`/${domain}/register`} element={<RegisterPage />} />
                    <Route path={`/${domain}/contacts`} element={<ContactPage />} />
                    <Route path={`/${domain}/features`} element={<FeaturesPage />} />
                </Route>

                <Route element={<DashboardLayout/>}>
                    <Route path={`/${domain}/dashboard/*`} element={<DashboardPage />}>
                        <Route index element={<Navigate to={`/${domain}/dashboard/uploaded-files`}/>}/>
                        <Route path={`uploaded-files`} element={<AllFilesPage />} />
                        <Route path={`profile`} element={<ProfilePage />} />
                        <Route path={`repositories`} element={<AllRepositoriesPage />}/>
                        <Route path={`repositories/repository`} element={<RepositoryFilesPage />}/>
                        <Route path={`files/file`} element={<FilePage />}/>
                        <Route path={`groups`} element={<GroupsPage />}/>
                        <Route path={`search`} element={<SearchPage />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        isInitialized: state.appReducer.isInitialized,
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = {
    initialize
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

const FinalApp = () => {
    return (
        <div className="app">
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </div>
    );
}

export default FinalApp;
