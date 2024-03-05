function CommentRating({comments}) {
    let total = 0;
    let average;
    comments.forEach((comment) => {
      total += comment.rating;
    });
    average = total / comments.length;
    return (
      <div className="comments-rating">
          <p>Total number of likes: <span>{total}</span> </p>
          <p>Average rating of likes: <span>{average.toFixed(1)}</span></p>
      </div>
    )
}
  
export default CommentRating;