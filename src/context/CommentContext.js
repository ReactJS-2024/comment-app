import axios from "axios";
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
        // ! STARO resenje - koristeci FETCH API za slanje API poziva
        // const response = await fetch('/comments');
        // const data = await response.json();

        // * NOVO resenje - koristeci AXIOS biblioteku
        const response = await axios.get('/comments');
        if (response.statusText === 'OK') {
          const {data} = response;
          setComments(data);
          setIsLoading(false);
        } else {
          alert('Oops! Something went wrong, please try again.');
        }
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
      // ! STARO resenje - koristeci FETCH API za slanje API poziva
      // const response = await fetch(`/comments/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(commentToUpdate)
      // })

      // * NOVO resenje - koristeci axios i PUT zahtev
      const response = await axios.put(`/comments/${id}`, commentToUpdate);

      if (response.statusText === 'OK') {
        const {data} = response;
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
          // ! STARO resenje - koristeci FETCH API za slanje API poziva
          // const response = await fetch(`/comments/${id}`, {
          //   method: 'DELETE'
          // });

          // * NOVO resenje - koristeci AXIOS i DELETE metodu
          const response = await axios.delete(`/comments/${id}`);
          if (response.statusText === 'OK') {
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
        // ! STARO resenje - koristeci FETCH API za slanje API poziva
        // const response = await fetch(`/comments/${id}`, {
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     rating: commentData.rating + 1
        //   })
        // });

        // * NOVO resenje - koristeci AXIOS i PATCH metodu
        const response = await axios.patch(`/comments/${id}`, {
          rating: commentData.rating + 1
        });

        if (response.statusText === 'OK') {
          const {data} = response;
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
     * @param {Object} commentData - comment that is disliked
     */
    const onDislikeComment = async (commentData) => {
      const {id} = commentData;
      try {
        // ! STARO resenje - koristeci FETCH API za slanje API poziva
        // const response = await fetch(`/comments/${id}`, {
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     rating: commentData.rating - 1
        //   })
        // });

        // * NOVO resenje - koristeci AXIOS i PATCH metodu
        const response = await axios.patch(`/comments/${id}`, {
          rating: commentData.rating - 1
        });

        if (response.statusText === 'OK') {
          const {data} = response;
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
      /*
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
      */
    }

    /**
     * @description Async Function for handling posting new comment
     * @param {object} newComment - object holding data for new comment to add
     */
    const onPostComment = async (newComment) => {
      try {
        // ! STARO resenje - koristeci FETCH API za slanje API poziva
        // const response = await fetch('/comments', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(newComment)
        // });

        // * NOVO resenje - koristeci AXIOS i POST metodu
        const response = await axios.post('/comments', newComment);
        if (response.statusText === 'Created') {
          const {data} = response; // lokalni server vraca u body-u podatak o kreiranom komentaru 
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