import { connect } from 'react-redux';
import CommentsList from "../CommentsList/CommentsList";
import { addFileComment, addRepositoryComment, deleteComment, loadFileComments, loadRepositoryComments, updateComment } from '../../store/thunks/commentThunks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../Loader/Loader';

function CommentSection({ type, id, comments, errors, isLoading, loadFileComments, loadRepositoryComments,
addFileComment, addRepositoryComment, updateComment, deleteComment }) {
    const { register, handleSubmit, reset, setValue, formState: { errors: formErrors } } = useForm();
    const [currentComment, setCurrentComment] = useState(null);

    useEffect(() => {
        if(type == 'file') {
            loadFileComments(id);
        } else if (type == 'repository') {
            loadRepositoryComments(id);
        }
    }, []);

    useEffect(() => {
        if(currentComment) {
            setValue('text', currentComment.text)
        }
    }, [currentComment]);

    const onFormSubmit = (data) => {
        if(currentComment) {
            updateComment({...currentComment, text: data.text});
            setCurrentComment(null);
        } else {
            if(type == 'file') {
                addFileComment(data.text);
            } else if (type == 'repository') {
                addRepositoryComment(data.text);
            }
        }

        reset();
    }

    const editComment = (comment) => {
        setCurrentComment(comment);
    }

    const deleteCommentFunc = (comment) => {
        deleteComment(comment.id)
    }

    if (isLoading) {
        return <Loader />
    }
    
    return (
        <div className="comments-section">
            <div className="row">
                <h4>Comments ({comments?.length})</h4>
            </div>
            <div className="row mb-3">
                <form onSubmit={handleSubmit(onFormSubmit)} className='mt-3'>
                    <div className='mb-2'>
                    <label htmlFor="text" className="">
                        {currentComment ? "Editing comment" : "New comment"}
                    </label>
                        <textarea className='form-control' rows={3} {...register("text", {
                            required: "This field is required.",
                        })}></textarea>
                        {formErrors.text ?
                        <small className="text-danger d-block">{formErrors.text.message}</small>
                        : null}
                    </div>
                    <button type='sumbit' className="btn btn-primary mt-2">
                        {currentComment ? 'Save changes' : 'Send'}
                    </button>
                </form>
            </div>
            <CommentsList comments={comments} errors={errors}  editComment={editComment} deleteComment={deleteCommentFunc}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        comments: state.commentReducer.comments,
        errors: state.commentReducer.errors,
        isLoading: state.commentReducer.isLoading,
        currentComment: state.commentReducer.currentComment,
    }
};

const mapDispatchToProps = {
    loadFileComments,
    loadRepositoryComments,
    addFileComment,
    addRepositoryComment,
    updateComment,
    deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)((CommentSection));