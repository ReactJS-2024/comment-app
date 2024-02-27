import './App.css';
import CommentItem from './components/CommentItem';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header headerText='Comment App' />
      <div className='container'>
        <h3>Please share your comment with us</h3>
        <div className='comments'>
          <CommentItem />
        </div>
      </div>
    </>
  )
}

export default App;
