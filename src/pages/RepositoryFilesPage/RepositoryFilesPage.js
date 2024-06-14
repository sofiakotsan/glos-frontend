import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import FileList from '../../components/FileList/FileList';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { loadRepositoryFiles } from '../../store/thunks/fileThunks';
import CommentSection from '../../components/CommentSection/CommentSection';
import { SORT_BY_FILE_OPTIONS, PAGE_SIZE, ACCESS_TYPES } from '../../helpers/constants';
import { setCurrentRepository } from '../../store/thunks/repositoryThunks';

function RepositoryFilesPage({ setCurrentRepository, currentRepository, files, isLoading, loadRepositoryFiles, errors }) {
    let [searchParams, setSearchParams] = useSearchParams();
    let repositoryName = searchParams.get('r');
    const [selectedOption, setSelectedOption] = useState(SORT_BY_FILE_OPTIONS[0]);
    const [accessTypes, setAccessTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const onSortChange = (newOption) => {
        setSelectedOption(newOption);
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        setCurrentRepository(repositoryName);
    }, []);

    useEffect(() => {
        if(currentRepository) {
            setAccessTypes(ACCESS_TYPES.filter(item => currentRepository?.access_types?.indexOf(item.value) != -1));
        }
    }, [currentRepository]);

    useEffect(() => {
        loadRepositoryFiles(currentPage, PAGE_SIZE, selectedOption.value);
    }, [selectedOption, currentPage]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="inner-page w-100">
            <div className='pagetitle d-flex align-items-center justify-content-between mb-4'>
                <h1>{repositoryName}</h1>
                <div className='d-flex align-items-center gap-4'>
                    <SortDropdown sortByOptions={SORT_BY_FILE_OPTIONS} selectedOption={selectedOption} onChange={onSortChange} />
                    {/* <a href='#'>Filter</a> */}
                </div>
            </div>
            <div className='mb-4'>
                <p className='mb-1'><b>Access type:</b>  {
                    accessTypes.length ? accessTypes.map(item => item.name).join(', ') : '-'
                }</p>
                <p className='mb-4'><b>Tags:</b> {
                    currentRepository?.tags.length ? currentRepository?.tags.join(', ') : '-'
                }</p>
            </div>
            <FileList files={files} onPageChange={onPageChange} errors={errors}/>
            <CommentSection type="repository" id={repositoryName}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.fileReducer.isLoading,
        files: state.fileReducer.files,
        errors: state.fileReducer.errors,
        currentRepository: state.repositoryReducer.currentRepository,
    }
}

const mapDispatchToProps = {
    loadRepositoryFiles,
    setCurrentRepository,
};

export default connect(mapStateToProps, mapDispatchToProps)((RepositoryFilesPage));