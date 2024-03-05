import { useState } from "react"
import Card from "./Card";
import {FaTrashAlt} from 'react-icons/fa';

function CommentItem({commentData, isOddItem, onDeleteComment, onLikeComment, onDislikeComment}) {
    const [rating, setRating] = useState(commentData.rating);
    const [text, setText] = useState(commentData.commentText);

    const likeComment = (commentId) => {
        // ! STATE-ovi su imutabilni sto znaci da za njihovo menjanje morate koristiti SET-ere, tj ne mozete direktno njih menjati (npr. rating = 5)
        setRating((prevVal) => {
            return prevVal + 1;
        });
        onLikeComment(commentId);
    }

    const dislikeComment = (commentId) => {
        setRating((prevVal) => {
            return prevVal - 1;
        });
        onDislikeComment(commentId);
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
            <div className="grade-number">{rating} <span onClick={() => likeComment(commentData.id)}>👍</span></div>
            <div className="grade-number dislike"><span onClick={() => dislikeComment(commentData.id)}>👎</span></div>
            <div className="grade-text">
                <p>{text}</p>
            </div>
            <button className="card-btn" onClick={modifyText}>
                Change Text
            </button>
        </Card>
    )
}

export default CommentItem