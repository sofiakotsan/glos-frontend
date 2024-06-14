import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import FileList from '../../components/FileList/FileList';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import { useEffect, useState } from 'react';
import RepositoryList from '../../components/RepositoryList/RepositoryList';
import { useSearchParams } from 'react-router-dom';
import { searchFiles } from '../../store/thunks/fileThunks';
import { searchRepositories } from '../../store/thunks/repositoryThunks';
import  { PAGE_SIZE } from '../../helpers/constants';

function SearchPage({ files, filesLoading, repositories, repositoriesLoading, fileErrors, 
    repositoryErrors, searchFiles, searchRepositories }) {
    let [searchParams, setSearchParams] = useSearchParams();
    // const [tags, setTags] = useState([]);
    let tags = searchParams.get('tags');
    console.log(tags)

    useEffect(() => {
        searchFiles(searchParams.get('s'), 1, PAGE_SIZE, tags);
        searchRepositories(searchParams.get('s'), 1, PAGE_SIZE, tags);
    }, []);

    const onFilePageChange = (page) => {
        searchFiles(searchParams.get('s'), page, PAGE_SIZE, tags);
    }

    const onRepositoryPageChange = (page) => {
        searchRepositories(searchParams.get('s'), page, PAGE_SIZE, tags);
    }

    if (filesLoading || repositoriesLoading) {
        return <Loader />
    }

    return (
        <div className="inner-page w-100">
            <div className='pagetitle d-flex align-items-center justify-content-between mb-4'>
                <h1>Search for: {searchParams.get('s')}</h1>
                {/* <div className='d-flex align-items-center gap-4'>
                    <SortDropdown sortByOptions={sortByOptions} selectedOption={selectedOption} onChange={onSortChange} />
                    <a href='#'>Filter (remove later)</a>
                </div> */}
            </div>

            <h5>Files</h5>
            <FileList files={files} errors={fileErrors} onPageChange={onFilePageChange}/>
            <hr className='my-3'/>
            <h5>Repositories</h5>
            <RepositoryList repositories={repositories} errors={repositoryErrors} onPageChange={onRepositoryPageChange}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        files: state.fileReducer.files,
        filesLoading: state.fileReducer.isLoading,
        repositories: state.repositoryReducer.repositories,
        repositoriesLoading: state.repositoryReducer.isLoading,
        fileErrors: state.fileReducer.errors,
        repositoryErrors: state.repositoryReducer.errors,
    }
}

const mapDispatchToProps = {
    searchFiles,
    searchRepositories
};

export default connect(mapStateToProps, mapDispatchToProps)((SearchPage));