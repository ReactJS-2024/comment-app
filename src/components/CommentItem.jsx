import { useContext, useState } from "react"
import Card from "./Card";
import {FaTrashAlt, FaRegEdit} from 'react-icons/fa';
import Button from "./Button";
import CommentContext from "../context/CommentContext";

function CommentItem({commentData, isOddItem}) {

    const {onDeleteComment, onLikeComment, onDislikeComment, onEditComment} = useContext(CommentContext);
    const {rating, commentText} = commentData;
    const [isCommentLiked, setIsCommentLiked] = useState(false);
    const [isCommentDisliked, setIsCommentDisliked] = useState(false);

    const likeComment = (commentData) => {
        if (!isCommentLiked) {
            onLikeComment(commentData);
            setIsCommentLiked(true);
            setIsCommentDisliked(false);
        }
    }

    const dislikeComment = (commentId) => {
        if (!isCommentDisliked) {
            onDislikeComment(commentId);
            setIsCommentDisliked(true);
            setIsCommentLiked(false);
        }
    }

    const deleteComment = (id) => {
       onDeleteComment(id);
    }

    const editComment = (commentData) => {
        onEditComment(commentData);
    }

    return (
        <Card darkMode={isOddItem}>
            <FaTrashAlt className="delete-btn-custom" onClick={() => deleteComment(commentData.id)} />
            <FaRegEdit className="edit-btn-custom" onClick={() => editComment(commentData)} />
            <div className="grade-number">
                {rating} 
                <button 
                    className="like-btn"
                    disabled={isCommentLiked}
                    onClick={() => likeComment(commentData)}>
                    👍
                </button>
            </div>
            <div className="grade-number dislike">
                <button
                    className="like-btn"
                    disabled={isCommentDisliked}
                    onClick={() => dislikeComment(commentData.id)}>
                    👎
                </button>
            </div>
            <div className="grade-text">
                <p>{commentText}</p>
            </div>
        </Card>
    )
}

export default CommentItem