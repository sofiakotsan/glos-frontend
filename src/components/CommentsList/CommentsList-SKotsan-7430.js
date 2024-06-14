import CommentItem from "../CommentItem/CommentItem";

function CommentsList({ comments, errors }) {
    return (
        <div className="comments-list">
            <div className="row">
                {
                    errors.map(err => <div className="col-12 text-danger" key={err} >
                        <p>{err}</p>
                    </div>)
                }
                {
                    comments ? comments.map(item => <div className="col-12" key={item.id} >
                        <CommetItem comment={item} />
                    </div>) : <p className="text-center">No comments found.</p>
                }
            </div>
        </div>
    );
}

export default CommentsList;