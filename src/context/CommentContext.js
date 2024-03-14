import { createContext, useState } from "react";
import CommentsMockData from "../mockData/CommentsMockData";

const CommentContext = createContext();

export const CommentProvider = ({children}) => {

    const [comments, setComments] = useState(CommentsMockData); // ovde cuvamo stanje (state) SVIH komentara iz mock fajla

    const [commentEdit, setCommentEdit] = useState({
      item: {},
      edit: false
    });

    /**
     * @description Function for handling click of comment edit icon
     * @param {object} item - item (comment) that we clicked
     */
    const onEditComment = (item) => {
      setCommentEdit({
        item,
        edit: true
      });
    }

    /**
     * @description Function for handling comment update
     * @param {string} commentId - id of a comment we want to update
     * @param {string} newCommentText - new text of comment we are updating
     */
    const editCommentHandler = (commentId, newCommentText) => {
      setComments((prevComments) => 
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              commentText: newCommentText
            }
          }
          return comment;
        })
      );
      setCommentEdit({
        item: {},
        edit: false
      })
    }

    /**
     * @description Function for handling comment cancel
     */
    const cancelChangesHandler = () => {
      setCommentEdit({
        item: {},
        edit: false
      });
    }

    /**
     * @description Function for handling comment removal
     * @param {string} id - id of comment to remove
     */
    const onDeleteComment = (id) => {
        if (!window.confirm('Please confirm deletion of this comment')) {
          return;
        }
        setComments(currentComments => currentComments.filter(c => c.id !== id));
    }

    /**
     * @description Function for handling comment liking
     * @param {string} id - id of comment to like
     */
    const onLikeComment = (id) => {
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                rating: comment.rating + 1
              };
            }
            return comment;
          })
        );
    };

    /**
     * @description Function for handling comment disliking
     * @param {string} id - id of comment to dislike
     */
    const onDislikeComment = (id) => {
        setComments((prevComments) => 
          prevComments.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                rating: comment.rating - 1
              };
            }
            return comment;
          })
        );
    }

    /**
     * @description Function for handling posting new comment
     * @param {object} newComment - object holding data for new comment to add
     */
    const onPostComment = (newComment) => {
        setComments([newComment, ...comments]); // kreiranje novog niza dodavanjem novog komentara i spread-ovanjem starih
        alert('You have added new comment!');
    }

    // ! JAKO VAZNO - svi property-i i sve metode koje hocete da koristite iz ovog context-a morate proslediti u value atributu provider-a ovaj context
    return <CommentContext.Provider value={{
        comments, 
        commentEdit, 
        onDeleteComment, 
        onLikeComment, 
        onDislikeComment, 
        onPostComment, 
        onEditComment, 
        editCommentHandler,
        cancelChangesHandler}}>
          {children}
    </CommentContext.Provider>
};

export default CommentContext;