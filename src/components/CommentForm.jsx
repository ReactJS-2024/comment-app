import { useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card";
import Button from "./Button";
import CommentContext from "../context/CommentContext";

function CommentForm() {

    const {onPostComment} = useContext(CommentContext);
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
            id: uuidv4(),
            rating: 0,
            commentText
        }
        onPostComment(newComment);
        setCommentText('');
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