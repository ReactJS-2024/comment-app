import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card";
import Button from "./Button";
import CommentContext from "../context/CommentContext";

function CommentForm() {

    const {onPostComment, commentEdit, editCommentHandler, cancelChangesHandler} = useContext(CommentContext);
    const [commentText, setCommentText] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // rascinjujemo commentEdit objekat na njegove property-e, koje cuvamo kao property-e ove CommentForm komponente
    const {edit, item} = commentEdit;

    // ! AKO je dependency array useEffect hook-a prazan (2. argument) , useEffect (tj efekat) okida se samo jednom, onda kada se komponenta ucita!
    // useEffect(() => {
    //     alert(1);
    // }, []);
    useEffect(() => {
        if (!edit) {
            return;
        }
        setCommentText(item.commentText);
    }, [commentEdit]);

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
        if (edit) {
            editCommentHandler(item.id, commentText);
        } else {
            onPostComment(newComment);
        }
        setCommentText('');
    }

    const handleCancelChange = () => {
        cancelChangesHandler();
        setCommentText(''); // setujemo na prazan string content forme ako kliknemo na cancel changes
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
                        children={edit ? 'Update Comment' : 'Post Comment'}
                    />
                    {
                        edit && <Button 
                            onClick={() => handleCancelChange()}
                            type={'button'}
                            isDisabled={false}
                            children={'Cancel changes'}/>
                    }
                    {/* <button type="submit">Post Comment</button> */}
                </div>
            </form>
        </Card>
    )
}

export default CommentForm