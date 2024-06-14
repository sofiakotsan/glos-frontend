import { Navigate, Outlet } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import { useState } from 'react';
import NewRepositoryModal from '../../components/NewRepositoryModal/NewRepositoryModal';
import NewFileModal from '../../components/NewFileModal/NewFileModal';
import EditFileModal from '../../components/EditFileModal/EditFileModal';
import EditRepositoryModal from '../../components/EditRepositoryModal/EditRepositoryModal';
import ShareRepositoryModal from '../../components/ShareRepositoryModal/ShareRepositoryModal';
import ShareFileModal from '../../components/ShareFileModal/ShareFileModal';
import DeleteFileModal from '../../components/DeleteFileModal/DeleteFileModal';
import DeleteRepositoryModal from '../../components/DeleteRepositoryModal/DeleteRepositoryModal';
import SearchModal from '../../components/SearchModal/SearchModal';
import NewGroupModal from '../../components/NewGroupModal/NewGroupModal';
import EditGroupModal from '../../components/EditGroupModal/EditGroupModal';
import DeleteGroupModal from '../../components/DeleteGroupModal/DeleteGroupModal';
import GroupUsersModal from '../../components/GroupUsersModal/GroupUsersModal';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';
import OperationCodeModal from '../../components/OperationCodeModal/OperationCodeModal';
import { connect } from 'react-redux';

function DashboardLayout({isAuth}) {
    const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 992 ? true : false);
    const domain = "glos-frontend";
    
    if(!isAuth) {
        return <Navigate to={`/${domain}/login`}/>
    }

    return (
        <div className={isSidebarVisible ? 'toggle-sidebar' : ''}>
            <DashboardHeader isSidebarVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} />
            <Outlet />
            <SearchModal />
            <NewFileModal />
            <NewRepositoryModal />
            <EditFileModal />
            <EditRepositoryModal />
            <ShareFileModal />
            <ShareRepositoryModal />
            <DeleteFileModal />
            <DeleteRepositoryModal />
            <NewGroupModal />
            <EditGroupModal />
            <DeleteGroupModal />
            <GroupUsersModal />
            <ErrorMessageModal />
            <OperationCodeModal />
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
    }
}

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)((DashboardLayout));