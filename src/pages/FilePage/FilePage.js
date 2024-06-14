import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import FileList from '../../components/FileList/FileList';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { loadRepositoryFiles, setCurrentFile } from '../../store/thunks/fileThunks';
import CommentSection from '../../components/CommentSection/CommentSection';
import FileDropdown from '../../components/FileDropdown/FileDropdown';
import { ReactComponent as DownloadIcon } from "../../assets/svg/download-file.svg";
import { ACCESS_TYPES } from "../../helpers/constants";

function FilePage({ currentFile, setCurrentFile, isLoading, errors }) {
    let [searchParams, setSearchParams] = useSearchParams();
    let fileName = searchParams.get('f');
    const [accessTypes, setAccessTypes] = useState([]);

    useEffect(() => {
        setCurrentFile(fileName);
    }, []);

    useEffect(() => {
        if(currentFile) {
            setAccessTypes(ACCESS_TYPES.filter(item => currentFile?.accessTypes?.indexOf(item.value) != -1));
        }
    }, [currentFile]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="inner-page w-100">
            <div className='pagetitle d-flex align-items-center justify-content-between mb-3'>
                <h1>{currentFile?.displayFilename}</h1>
                <FileDropdown fileId={currentFile?.rootFullName} />
            </div>
            <div className='mb-4'>
                <p className='mb-1'><b>Size:</b> {currentFile?.rootSize}</p>
                <p className='mb-1'><b>Format:</b> {currentFile?.rootFormat}</p>
                <p className='mb-1'><b>Repository:</b> {currentFile?.displayPath}</p>
                <p className='mb-1'><b>Access type:</b>  {
                    accessTypes.length ? accessTypes.map(item => item.name).join(', ') : '-'
                }</p>
                <p className='mb-4'><b>Tags:</b> {
                    currentFile?.tags.length ? currentFile?.tags.join(', ') : '-'
                }</p>
                
                <div className='file-download-btn d-inline-flex flex-column align-items-center'>
                    <DownloadIcon/>
                    <div><button className='btn btn-link mt-1'>Download</button></div>
                </div>
                
            </div>
            <CommentSection type="file" id={currentFile?.rootFullName} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.fileReducer.isLoading,
        currentFile: state.fileReducer.currentFile,
        errors: state.fileReducer.errors,
    }
}

const mapDispatchToProps = {
    setCurrentFile
};

export default connect(mapStateToProps, mapDispatchToProps)((FilePage));