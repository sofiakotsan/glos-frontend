import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import { useEffect, useState } from 'react';
import RepositoryList from '../../components/RepositoryList/RepositoryList';
import { loadLatestRepositories } from '../../store/thunks/repositoryThunks';
import { SORT_BY_REPORITORY_OPTIONS, PAGE_SIZE } from '../../helpers/constants';

function AllRepositoriesPage({ loadLatestRepositories, isLoading, repositories, errors }) {
    const [selectedOption, setSelectedOption] = useState(SORT_BY_REPORITORY_OPTIONS[0]);
    const [currentPage, setCurrentPage] = useState(1);

    const onSortChange = (newOption) => {
        setSelectedOption(newOption);
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        loadLatestRepositories(currentPage, PAGE_SIZE, selectedOption.value);
    }, [selectedOption, currentPage]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="inner-page w-100">
            <div className='pagetitle d-flex align-items-center justify-content-between mb-4'>
                <h1>All repositories</h1>
                <div className='d-flex align-items-center gap-4'>
                    <SortDropdown sortByOptions={SORT_BY_REPORITORY_OPTIONS} selectedOption={selectedOption} onChange={onSortChange} />
                    {/* <a href='#'>Filter</a> */}
                </div>
            </div>

            <RepositoryList repositories={repositories} errors={errors} onPageChange={onPageChange}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        repositories: state.repositoryReducer.repositories,
        errors: state.repositoryReducer.errors,
        isLoading: state.repositoryReducer.isLoading,
    }
}

const mapDispatchToProps = {
    loadLatestRepositories
};

export default connect(mapStateToProps, mapDispatchToProps)((AllRepositoriesPage));