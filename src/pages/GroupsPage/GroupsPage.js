import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import GroupList from '../../components/GroupList/GroupList';
import { loadGroups } from '../../store/thunks/groupThunks';
import { useEffect } from 'react';

function GroupsPage({isLoading, groups, errors, loadGroups}) {
    useEffect(() => {
        loadGroups();
    }, []);

    if(isLoading) {
        return <Loader/>
    }

    return (
        <div className="inner-page">
            <div className='pagetitle d-flex flex-wrap justify-content-between align-items-center gap-2'>
                <h1>My groups</h1>
                <a className='btn btn-primary' href="#" data-bs-toggle="modal" data-bs-target="#newGroupModal">
                    <i className='bi bi-plus sub-menu-special-icon me-2'></i>
                    <span>Add new group</span>
                </a>
            </div>
            <GroupList groups={groups} errors={errors}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        groups: state.groupReducer.groups,
        errors: state.groupReducer.errors,
        isLoading: state.groupReducer.isLoading,
    }
}

const mapDispatchToProps = {
    loadGroups
};

export default connect(mapStateToProps, mapDispatchToProps)((GroupsPage));