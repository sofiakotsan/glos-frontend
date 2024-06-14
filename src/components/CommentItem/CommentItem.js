import CommentDropdown from "../CommentDropdown/CommentDropdown";

function CommentItem({ comment, editComment, deleteComment }) {
    return (
        <div className="card card-list-item d-flex flex-row mb-2">
            <div className="card-body p-2 d-flex justify-content-between gap-2">
                <div>
                    <h6 className="fs-6 text-medium card-title p-0 m-0">
                        <small>@{comment.author} <small className="text-secondary">({comment.date})</small></small>
                    </h6>
                    <p className="m-0">{comment.text}</p>
                </div>
                <CommentDropdown comment={comment} editComment={editComment} deleteComment={deleteComment}/>
            </div>
        </div>
    );
}

export default CommentItem;