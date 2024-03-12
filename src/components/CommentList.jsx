import { useContext } from "react"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"
import CommentRating from "./CommentRating"
import CommentContext from "../context/CommentContext"


function CommentList() {

    const {comments} = useContext(CommentContext);

    return (
        <ul className="comments-list">
            <CommentRating />
            <CommentForm/>
            {
                
                !comments || !comments.length 
                ? (
                    <h1>No comments to display!</h1>
                ) :
                (
                    comments.map((comment, i) => {
                        return <CommentItem 
                            key={comment.id}
                            commentData={comment} 
                            isOddItem={i%2 !== 0}
                        />
                    })
                )
                  
            }
        </ul>
    )
}

export default CommentList