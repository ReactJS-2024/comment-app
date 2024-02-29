import CommentItem from "./CommentItem"
import CommentRating from "./CommentRating"


function CommentList({comments, onDeleteComment}) {
    return (
        <ul className="comments-list">
            <CommentRating comments={comments} />
            {
                comments.map((comment, i) => {
                    return <CommentItem 
                        key={comment.id}
                        commentData={comment} 
                        isOddItem={i%2 !== 0} 
                        onDeleteComment={(id) => {onDeleteComment(id)}}
                    />
                })
            }
        </ul>
    )
}

export default CommentList