
import { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SearchModal({ repository }) {
    const domain = "glos-frontend";
    const { register, handleSubmit, reset, formState: { errors: formErrors } } = useForm();
    const navigate = useNavigate();
    const closeBtn = createRef();
    const tagInput = createRef();
    const [tags, setTags] = useState([]);
    const [tagError, setTagError] = useState('');

    const onFormSubmit = (data) => {
        navigate(domain + '/dashboard/search?s=' + encodeURIComponent(data.search) + '&tags=' + encodeURIComponent(tags.join(',')));
        closeBtn.current.click();
    };

    const resetForm = () => {
        reset({
            search: '',
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

    return (
        <div id="searchModal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Search</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeBtn} onClick={resetForm}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="search" className="">Search</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className='bi bi-search'></i>
                                    </span>
                                    <input type="search" className="form-control" placeholder="Start typing..."
                                        {...register("search", {
                                            // required: "This field is required.",
                                            maxLength: 200,
                                        })} />
                                </div>
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
                                            </span>) : <small>No tags.</small>
                                        }
                                    </div>
                                </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit(onFormSubmit)}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;