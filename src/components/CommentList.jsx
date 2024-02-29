import CommentItem from "./CommentItem"


function CommentList({comments, onDeleteComment}) {
    return (
        <ul className="comments-list">
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