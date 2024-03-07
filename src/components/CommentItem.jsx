import { useState } from "react"
import Card from "./Card";
import {FaTrashAlt} from 'react-icons/fa';
import Button from "./Button";

function CommentItem({commentData, isOddItem, onDeleteComment, onLikeComment, onDislikeComment}) {
    const [rating, setRating] = useState(commentData.rating);
    const [text, setText] = useState(commentData.commentText);
    const [isCommentLiked, setIsCommentLiked] = useState(false);
    const [isCommentDisliked, setIsCommentDisliked] = useState(false);

    const likeComment = (commentId) => {
        if (!isCommentLiked) {
            setRating((prevVal) => {
                return prevVal + 1;
            });
            onLikeComment(commentId);
            setIsCommentLiked(true);
            setIsCommentDisliked(false);
        }
    }

    const dislikeComment = (commentId) => {
        if (!isCommentDisliked) {
            setRating((prevVal) => {
                return prevVal - 1;
            });
            onDislikeComment(commentId);
            setIsCommentDisliked(true);
            setIsCommentLiked(false);
        }
    }

    const deleteComment = (id) => {
       onDeleteComment(id);
    }

    const modifyText = () => {
        setText('Existing comment has been changed to this value.');
    }

    return (
        <Card darkMode={isOddItem}>
            <FaTrashAlt className="delete-btn-custom" onClick={() => deleteComment(commentData.id)} />
            <div className="grade-number">
                {rating} 
                <button 
                    className="like-btn"
                    disabled={isCommentLiked}
                    onClick={() => likeComment(commentData.id)}>
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
                <p>{text}</p>
            </div>
            {/* TODO add class name (card-btn) */}
            <Button 
                children={'Change Text'}
                onClick={modifyText}
            />
        </Card>
    )
}

export default CommentItem