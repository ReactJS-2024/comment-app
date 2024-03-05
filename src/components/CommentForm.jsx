import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

function CommentForm() {

    const [commentText, setCommentText] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleCommentTextChange = (e) => {
        if (commentText !== '' && commentText.trim().length < 15) {
            setErrorMsg('Comment must contain at least 15 characters!');
        } else {
            setErrorMsg('');
        }
        setCommentText(e.target.value);
    }

    const handlePostComment = (e) => {
        e.preventDefault(); // ! prevent-uje (zaustavlja) default ponasanje submit-ovanja standardnih HTML formi
        const newComment = {
            // id: postaviti na vrednost uuid generisanja
            rating: 0,
            commentText
        }
        console.log(newComment);
    }

    return (
        <Card darkMode={true}>
            <form onSubmit={handlePostComment}>
                <h3>Here you can leave your comment <sup>(you will stay anonymous)</sup></h3>
                <div className="input-group">
                    <textarea 
                        name="commentText" 
                        value={commentText}
                        onChange={handleCommentTextChange}
                        placeholder="Enter your comment here...">
                    </textarea>
                    <p className="error-msg">{errorMsg}</p>
                    <Button 
                        isDisabled={commentText.trim().length < 15}
                        type={'submit'}
                        children={'Post Comment'}
                    />
                    {/* <button type="submit">Post Comment</button> */}
                </div>
            </form>
        </Card>
    )
}

export default CommentForm