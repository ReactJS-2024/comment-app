import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CommentsMockData from './mockData/CommentsMockData';
import CommentList from './components/CommentList';

function App() {
  const [comments, setComments] = useState(CommentsMockData);
  const onDeleteComment = (id) => {
    if (!window.confirm('Please confirm deletion of this comment')) {
      return;
    }
    setComments(currentComments => currentComments.filter(c => c.id !== id));
  }
  return (
    <>
      <Header headerText='Comment App' />
      <div className='container'>
        <h3>Please share your comment with us</h3>
        <div className='comments'>
          {
            !comments || !comments.length 
            ? (
              <h1>No comments to display!</h1>
            ) :
            (
              <CommentList
                comments={comments} 
                onDeleteComment={onDeleteComment} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App;
