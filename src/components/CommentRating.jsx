import { useContext } from "react";
import CommentContext from "../context/CommentContext";

function CommentRating() {

  const {comments} = useContext(CommentContext);

  let total = 0;
  let average;
  comments.forEach((comment) => {
    total += comment.rating;
  });
  average = total / comments.length;
  return (
    <div className="comments-rating">
        <p>Total number of likes: <span>{total}</span> </p>
        <p>Average rating of likes: <span>{isNaN(average.toFixed(1)) ? 0 : average.toFixed(1)}</span></p>
    </div>
  )
}
  
export default CommentRating;