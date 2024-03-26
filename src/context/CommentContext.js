import { createContext, useEffect, useState } from "react";

const CommentContext = createContext();

export const CommentProvider = ({children}) => {

    const [comments, setComments] = useState([]); // ovde cuvamo stanje (state) SVIH komentara iz mock fajla
    const [isLoading, setIsLoading] = useState(true);

    const [commentEdit, setCommentEdit] = useState({
      item: {},
      edit: false
    });

    useEffect(() => {
      fetchComments();
    }, []);

    /**
     * @description Sends API call for fetching all comments from json server
     */
    const fetchComments = async () => {
      try {
        const response = await fetch('/comments');
        const data = await response.json();
        // console.log(data); // * preporuka je da prvo konzol logujete odgovor da vidite da li su podaci koje ocekujete tu
        setComments(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

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
     * @param {String} id - id of comment to update
     * @param {Object} commentToUpdate - comment to
     */
    const editCommentHandler = async (id, commentToUpdate) => {
      const response = await fetch(`/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentToUpdate)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Your comment has been updated.');
        setComments(comments.map((item) => {
          if (item.id === id) {
            return {...item, ...data}
          } else {
            return item;
          }
        }));
        setCommentEdit({
          item: {},
          edit: false
        });
      } else {
        alert('Oops! Something went wrong, please try again.');
      }

      // ! stara implementacija bez slanja API poziva
      /*
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
      */
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
    const onDeleteComment = async (id) => {
        if (!window.confirm('Please confirm deletion of this comment')) {
          return;
        }
        try {
          const response = await fetch(`/comments/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            alert('You have successfully deleted comment.');
            setComments(currentComments => currentComments.filter(c => c.id !== id));
          } else {
            alert('Ooops! Something went wrong, please try again.');
          }
        } catch (error) {
          console.log(error);
        }

        // ! stara verzija bez slanja API poziva
        // setComments(currentComments => currentComments.filter(c => c.id !== id));
    }

    /**
     * @description Function for handling comment liking
     * @param {Object} commentData - comment that is liked
     */
    const onLikeComment = async (commentData) => {
      const {id} = commentData;
      try {
        const response = await fetch(`/comments/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            rating: commentData.rating + 1
          })
        });

        if (response.ok) {
          const data = await response.json();
          setComments((prevComments) => 
            prevComments.map((comment) => {
              if (comment.id === id) {
                return data;
              }
              return comment;
            })
          )
        }
      } catch (error) {
        console.log(error);
      }

      // ! stara verzija bez slanja API poziva
      /*
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
      */
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
     * @description Async Function for handling posting new comment
     * @param {object} newComment - object holding data for new comment to add
     */
    const onPostComment = async (newComment) => {
      try {
        const response = await fetch('/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
        });
        if (response.ok) {
          const data = await response.json(); // lokalni server vraca u body-u podatak o kreiranom komentaru 
          setComments([data, ...comments]);
          alert('New comment has been succesfully added!');
        } else {
          alert('Ooops! Something went wrong, please try again.');
        }
      } catch (error) {
        console.log(error);
      }

      // ! stari nacin - bez slanja API poziva
      // setComments([newComment, ...comments]); 
      // alert('You have added new comment!');
    }

    // ! JAKO VAZNO - svi property-i i sve metode koje hocete da koristite iz ovog context-a morate proslediti u value atributu provider-a ovaj context
    return <CommentContext.Provider value={{
        comments, 
        commentEdit,
        isLoading, 
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