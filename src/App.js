import { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CommentList from './components/CommentList';
import About from './pages/About';
import PostDetails from './components/PostDetails';
import NotFound from './pages/NotFound';
import { CommentProvider } from './context/CommentContext';

function App() {

  return (
    <CommentProvider>
      <Router>
        <Header headerText='Comment App' />
        <div className='container'>
          <Routes>
            {/* Primer lose upotrebe Route tag-a (jer sam u Route tag-u postavio komplet HTML sadrzaj) */}
            <Route path='/' element={
              <>
                <h3>Please share your comment with us</h3>
                <div className='comments'>
                  <CommentList />
                </div>
              </>
            }>
            </Route>
            <Route path='/about' element={<About />} />
            <Route path='/post/:postId' element={<PostDetails />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </CommentProvider>
  )
}

export default App;
