import CommentItem from "../CommentItem/CommentItem";

function CommentsList({ comments, errors, editComment, deleteComment }) {
    return (
        <div className="comments-list">
            <div className="row">
                {
                    errors.map(err => <div className="col-12 text-danger" key={err} >
                        <p>{err}</p>
                    </div>)
                }
                {
                    comments && comments?.length ? comments.map(item => <div className="col-12" key={item.id} >
                        <CommentItem comment={item} editComment={editComment} deleteComment={deleteComment}/>
                    </div>) : <p className="text-center">No comments found.</p>
                }
            </div>
        </div>
    );
}

export default CommentsList;