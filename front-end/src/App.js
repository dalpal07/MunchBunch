import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Post from './components/Post.js'
import PostForm from './components/PostForm.js'
import EditPostForm from './components/EditPostForm.js'

function App() {
  // setup state
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(undefined);

  const fetchPosts = async() => {
    try {      
      const response = await axios.get("/cp4-api/posts");
      let newPosts = response.data.posts
      newPosts.sort(function(a, b) {
        if (parseInt(a.date.substring(0,4)) !== parseInt(b.date.substring(0,4))) {
          return parseInt(a.date.substring(0,4)) - parseInt(b.date.substring(0,4))
        }
        else if (parseInt(a.date.substring(5, 7)) !== parseInt(b.date.substring(5, 7))) {
          return parseInt(a.date.substring(5, 7)) - parseInt(b.date.substring(5, 7))
        }
        else {
          return parseInt(a.date.substring(8)) - parseInt(b.date.substring(8))
        }
      })
      setPosts(newPosts);
    } catch(error) {
      setError("error retrieving posts: " + error);
    }
  }
  const createPost = async() => {
    try {
      await axios.post("/cp4-api/posts", {date: date, title: title, entry: entry});
    } catch(error) {
      setError("error adding a post: " + error);
    }
  }
  const editOnePost = async() => {
    try {
      let post = {date: editing.date, title: editing.title, entry: editing.entry}
      await axios.patch("/cp4-api/posts/" + editing.id, post)
    } catch(error) {
      setError("error editing a post")
    }
  }
  const deleteOnePost = async(post) => {
    try {
      await axios.delete("/cp4-api/posts/" + post.id);
    } catch(error) {
      setError("error deleting a post" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchPosts();
  },[]);

  const addPost = async(e) => {
    e.preventDefault();
    await createPost();
    fetchPosts();
    setDate("");
    setTitle("");
    setEntry("");
    setAdding(false);
    setEditing(undefined);
  }
  
  const editPost = async(e) => {
    e.preventDefault();
    await editOnePost()
    fetchPosts();
    setEditing(undefined)
  }

  const deletePost = async(post) => {
    await deleteOnePost(post);
    fetchPosts();
  }
  
  const toggleAdding = async() => {
    setAdding(!adding)
  }
  
  const goToTop = async() => {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  };
  
  function formOrButton() {
    if (adding === true) {
      return (<div><h1 className="jTitle">Journal Entries</h1>
      <PostForm addPost={addPost} date={date} setDate={setDate} title={title} setTitle={setTitle}
      entry={entry} setEntry={setEntry} setAdding={setAdding}/></div>)
    }
    else if (editing !== undefined) {
      goToTop()
      return (<div><h1 className="jTitle">Journal Entries</h1>
      <EditPostForm editing={editing} setEditing={setEditing} editPost={editPost} date={date} setDate={setDate} title={title}
      setTitle={setTitle} entry={entry} setEntry={setEntry}/></div>)
    }
    else {
      return (<div><h1 className="jTitle">Journal Entries</h1><button onClick={toggleAdding} className="top-content white">Add Entry</button></div>)
    }
  }

  // render results
  return (
    <div className="App">
      {error}
      {formOrButton()}
      {posts.map( post => (
       <Post post={post} deleteOnePost={deleteOnePost} fetchPosts={fetchPosts} setEditing={setEditing}/>
      ))}
      <footer>See GitHub Repositore <a href="https://github.com/dalpal07/cp4.git">here</a></footer>
    </div>
  );
}

export default App;