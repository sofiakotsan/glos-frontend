import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { ACCESS_TYPES } from "../../helpers/constants";
import { editRepository } from "../../store/thunks/repositoryThunks";
import Loader from '../../components/Loader/Loader';
import { createRef, useEffect, useState } from 'react';
import { loadGroups } from '../../store/thunks/groupThunks';

function EditRepositoryModal({ isLoading, editRepository, currentRepository, loadGroups, isGroupLoading, groups }) {
    const { register, handleSubmit, setValue, reset, formState: { errors: formErrors } } = useForm();
    const closeBtn = createRef();
    const tagInput = createRef();
    const groupInput = createRef();
    const accessInput = createRef();
    const [tags, setTags] = useState([]);
    const [tagError, setTagError] = useState('');
    const [availableGroups, setAvailableGroups] = useState([]);

    const [accessGroups, setAccessGroups] = useState([]);

    useEffect(() => {
        if(!currentRepository) return;
        // closeBtn.current.click();
        setValue('accessTypes', currentRepository.access_types);
        setTags(currentRepository.tags);
        setAccessGroups(currentRepository.access_types.map(item => {
            const parsedValues = item.split("_");
            return {
                name: parsedValues[2],
                access: parsedValues[0],
            };
        }));
    }, [currentRepository]);
    
    useEffect(() => {
        loadGroups();
    }, []);

    useEffect(() => {
        if(groups?.length) {
            setAvailableGroups(groups.filter(item => {
                const found = accessGroups.filter(ag => ag.name == item.name);
                return found.length == 0;
            }));
        }
    }, [groups]);

    const resetForm = () => {
        reset({
            accessTypes: [],
        })
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

    const addGroup = () => {
        if(!groupInput.current.value || !accessInput.current.value) return;

        setAccessGroups([{
            name: groupInput.current.value,
            access: accessInput.current.value,
        }, ...accessGroups]);
        setAvailableGroups(availableGroups.filter(item => item.name != groupInput.current.value));
        groupInput.current.value = null;
        accessInput.current.value = null;
    }

    const removeGroup = (group) => {
        setAccessGroups(accessGroups.filter(item => item.name != group.name));

        setAvailableGroups(groups.filter(item => {
            const found = accessGroups.filter(ag => ag.name == item.name && item.name != group.name);
            return found.length == 0;
        }));
    }

    const removeTag = (tag) => {
        setTags(tags.filter(item => item != tag));
    }

    const onFormSubmit = (data) => {
        let accessTypes = [];
        accessGroups.forEach(item => {
            accessTypes.push(item.access + "_GROUP_" + item.name);
        });

        editRepository(currentRepository.rootFullName, accessTypes, tags);
    };

    return (
        <div id="editRepositoryModal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit repository</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeBtn}
                            onClick={resetForm}></button>
                    </div>
                    <div className="modal-body">
                        {
                            isLoading || isGroupLoading ? <Loader /> :
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                {/* <div className="mb-3">
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
                                </div> */}
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

                                <div className="mb-3">
                                    <label htmlFor="tags" className="">Add access for group</label>
                                    <div className='d-flex gap-2'>
                                        <div className='d-flex align-items-center'>Group: </div>
                                        <select className='form-control' ref={groupInput}>
                                            {
                                                availableGroups.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='d-flex gap-2 mt-2'>
                                        <div className='d-flex align-items-center'>Access: </div>
                                        <select className='form-control' ref={accessInput}>
                                            {
                                                ACCESS_TYPES.map(item => <option value={item.value} key={item.value}>
                                                    {item.name}
                                                </option>)
                                            }
                                        </select>
                                    </div>
                                    <button className='btn btn-primary ms-auto d-block mt-2' type="button" onClick={addGroup}>Add</button>
                                </div>
                                <div className="mb-3">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th colSpan={2}>Groups who have access</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    accessGroups.length ? accessGroups.map(item => {
                                                        return <tr key={item.name}>
                                                            <td>{item.name} - {item.access}</td>
                                                            <td align='right'>
                                                                <button className='btn btn-primary' type="button" onClick={() => {removeGroup(item)}}>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    }) :
                                                    <tr>
                                                        <td>No groups found.</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
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
        groups: state.groupReducer.groups,
        isGroupLoading: state.groupReducer.isLoading,
        isLoading: state.repositoryReducer.isLoading,
        currentRepository: state.repositoryReducer.currentRepository,
    }
};

const mapDispatchToProps = {
    editRepository,
    loadGroups
};

export default connect(mapStateToProps, mapDispatchToProps)((EditRepositoryModal));