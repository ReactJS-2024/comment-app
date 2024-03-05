import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"
import CommentRating from "./CommentRating"


function CommentList({comments, onDeleteComment, onLikeComment, onDislikeComment, onPostComment}) {
    return (
        <ul className="comments-list">
            <CommentRating comments={comments} />
            <CommentForm onPostComment={(newComment) => {onPostComment(newComment)}} />
            {
                comments.map((comment, i) => {
                    return <CommentItem 
                        key={comment.id}
                        commentData={comment} 
                        isOddItem={i%2 !== 0} 
                        onLikeComment={(id) => {onLikeComment(id)}}
                        onDislikeComment={(id) => {onDislikeComment(id)}}
                        onDeleteComment={(id) => {onDeleteComment(id)}}
                    />
                })
            }
        </ul>
    )
}

export default CommentList