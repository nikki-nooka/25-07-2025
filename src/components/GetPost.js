import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', views: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setPosts(response.data.reverse());
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const addPost = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/student', newPost)
      .then(response => {
        setPosts(prevPosts => [response.data, ...prevPosts]);
        setNewPost({ title: '', views: '' });
        setError(null);
      })
      .catch(error => {
        console.error('Error adding post:', error);
        setError('Failed to add post.');
      });
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '28px',
        color: '#343a40',
        marginBottom: '20px'
      }}>
        📃 <strong>All Posts</strong>
      </h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <h3 style={{
        textAlign: 'center',
        color: '#6f42c1',
        marginBottom: '15px'
      }}>
        ➕ Add New Post
      </h3>

      <form onSubmit={addPost} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '30px'
      }}>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Enter Title"
          required
          style={{
            padding: '10px',
            border: '1px solid #ced4da',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <input
          type="number"
          name="views"
          value={newPost.views}
          onChange={handleChange}
          placeholder="Enter Views"
          required
          style={{
            padding: '10px',
            border: '1px solid #ced4da',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
          Add Post
        </button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {posts.map(post => (
          <li key={post.id} style={{
            marginBottom: '15px',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#212529' }}>
              {post.title || 'Untitled'}
            </h4>
            <p style={{ margin: 0, color: '#6c757d' }}>
              👁️ Views: {post.views || 0}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetPost;
