import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { ACCESS_TYPES } from "../../helpers/constants";
import { editFile } from "../../store/thunks/fileThunks";
import Loader from '../../components/Loader/Loader';
import { createRef, useEffect, useState } from 'react';

function EditFileModal({ isLoading, errors, editFile, currentFile }) {
    const { register, handleSubmit, setValue, reset, formState: { errors: formErrors } } = useForm();
    const closeBtn = createRef();
    const tagInput = createRef();
    const [tags, setTags] = useState([]);
    const [tagError, setTagError] = useState('');

    useEffect(() => {
        if(!currentFile) return;
        // closeBtn.current.click();
        setValue('accessTypes', currentFile.accessTypes);
        setTags(currentFile.tags);
    }, [currentFile]);

    const resetForm = () => {
        reset({
            accessTypes: [],
        });
        setTags([]);
    }

    const addTag = () => {
        const tag = tagInput.current.value;
        if(tags.indexOf(tag) != -1) {
            setTagError('This tag already exists.');
            return;
        } else if(tag?.length == 0) {
            setTagError('This field is required.');
            return;
        } else if(!/^([a-z0-9]{1,})$/.test(tag)) {
            setTagError('Tag can only contain lowercase letters and numbers.');
            return;
        }

        setTagError('');
        setTags([tag, ...tags]);
        tagInput.current.value = '';
    }

    const removeTag = (tag) => {
        setTags(tags.filter(item => item != tag));
    }

    const onFormSubmit = (data) => {
        // setFileAccess
        editFile(currentFile.repository?.id, currentFile.rootFullName, data.accessTypes, tags);
        // todo: add move ability
    };

    return (
        <div id="editFileModal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit file</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeBtn}
                            onClick={resetForm}></button>
                    </div>
                    <div className="modal-body">
                        {
                            errors && errors?.length ? errors.map(err => {
                                return <p className='text-danger'>{err}</p>
                            }) : null
                        }
                        {
                            isLoading ? <Loader /> :
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="mb-3">
                                    <label htmlFor="accessTypes" className="">Access</label>
                                    <select className="form-control" multiple={true}
                                        {...register("accessTypes", {
                                            required: "This field is required.",
                                        })}>
                                        {
                                            ACCESS_TYPES.map(item => <option value={item.value} key={item.value}>
                                                {item.name}
                                            </option>)
                                        }
                                    </select>
                                    {formErrors.accessTypes ?
                                        <small className="text-danger d-block">{formErrors.accessTypes.message}</small>
                                        : null}
                                    <small className="text-muted">Tip: hold CTRL to select multiple.</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tags" className="">Tags</label>
                                    <div className='d-flex gap-1'>
                                        <input className='form-control' 
                                                name='tags' 
                                                pattern="[a-z0-9]+" 
                                                ref={tagInput}
                                                onKeyPress={(e) => { 
                                                    if(e.key === 'Enter' ) {
                                                        e.preventDefault(); 
                                                        addTag();
                                                    }
                                                }}/>
                                        <button className='btn btn-primary' type='button' onClick={addTag}>Add</button>
                                    </div>
                                    {
                                        tagError?.length ? <small className="text-danger d-block">{tagError}</small> : null
                                    }
                                    <div className='d-flex gap-2 flex-wrap mt-2'>
                                        {
                                            tags?.length ? tags.map(item => <span key={item} className="badge text-bg-primary d-inline-block">
                                                #{item}
                                                <span className='d-inline-block ms-2 tag-remove-btn' onClick={() => {removeTag(item);}}>x</span>
                                            </span>) : <small>No tags found.</small>
                                        }
                                    </div>
                                </div>
                            </form>
                        }

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit(onFormSubmit)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.fileReducer.isLoading,
        currentFile: state.fileReducer.currentFile,
        errors: state.fileReducer.errors,
    }
};

const mapDispatchToProps = {
    editFile
};

export default connect(mapStateToProps, mapDispatchToProps)((EditFileModal));