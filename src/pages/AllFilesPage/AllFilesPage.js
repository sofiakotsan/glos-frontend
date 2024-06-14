import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import FileList from '../../components/FileList/FileList';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import { useEffect, useState } from 'react';
import { loadLatestFiles } from '../../store/thunks/fileThunks';
import { SORT_BY_FILE_OPTIONS, PAGE_SIZE } from '../../helpers/constants';

function AllFilesPage({ files, isLoading, loadLatestFiles, errors, }) {
    const [selectedOption, setSelectedOption] = useState(SORT_BY_FILE_OPTIONS[0]);
    const [currentPage, setCurrentPage] = useState(1);

    const onSortChange = (newOption) => {
        setSelectedOption(newOption);
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        loadLatestFiles(currentPage, PAGE_SIZE, selectedOption.value);
    }, [selectedOption, currentPage]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="inner-page w-100">
            <div className='pagetitle d-flex align-items-center justify-content-between mb-4'>
                <h1>Uploaded files</h1>
                <div className='d-flex align-items-center gap-4'>
                    <SortDropdown sortByOptions={SORT_BY_FILE_OPTIONS} selectedOption={selectedOption} onChange={onSortChange} />
                    {/* <a href='#'>Filter</a> */}
                </div>
            </div>

            <FileList files={files} errors={errors} onPageChange={onPageChange}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.fileReducer.isLoading,
        files: state.fileReducer.files,
        errors: state.fileReducer.errors,
    }
}

const mapDispatchToProps = {
    loadLatestFiles
};

export default connect(mapStateToProps, mapDispatchToProps)((AllFilesPage));