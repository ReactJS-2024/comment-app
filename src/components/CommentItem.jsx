import { useState } from "react"

function CommentItem() {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, eaque!');

    const likeComment = () => {
        // ! STATE-ovi su imutabilni sto znaci da za njihovo menjanje morate koristiti SET-ere, tj ne mozete direktno njih menjati (npr. rating = 5)
        setRating((prevVal) => {
            return prevVal + 1;
        });
    }

    const dislikeComment = () => {
        setRating((prevVal) => {
            return prevVal - 1;
        });
    }

    const modifyText = () => {
        setText('Existing comment has been changed to this value.');
    }

    return (
        <div className="card">
            <div className="grade-number">{rating} <span onClick={likeComment}>👍</span></div>
            <div className="grade-number dislike"><span onClick={dislikeComment}>👎</span></div>
            <div className="grade-text">
                <p>{text}</p>
            </div>
            <button className="card-btn" onClick={modifyText}>
                Change Text
            </button>
        </div>
    )
}

export default CommentItem