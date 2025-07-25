import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    branch: '',
    course: '',
    fee: ''
  });

  const [editId, setEditId] = useState(null);
  const [editStudent, setEditStudent] = useState({
    name: '',
    age: '',
    branch: '',
    course: '',
    fee: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:3000/student')
      .then(response => {
        const filtered = response.data.filter(item => item.name && item.course && item.fee);
        setStudents(filtered.reverse());
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent(prev => ({ ...prev, [name]: value }));
  };

  const addStudent = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/student', newStudent)
      .then(response => {
        fetchStudents();
        setNewStudent({ name: '', age: '', branch: '', course: '', fee: '' });
        setError(null);
      })
      .catch(error => {
        console.error('Error adding student:', error);
        setError('Failed to add student.');
      });
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:3000/student/${id}`)
      .then(() => {
        fetchStudents();
      })
      .catch(error => {
        console.error('Error deleting student:', error);
        setError('Failed to delete student.');
      });
  };

  const startEdit = (student) => {
    setEditId(student.id);
    setEditStudent({ ...student });
  };

  const updateStudent = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/student/${editId}`, editStudent)
      .then(() => {
        fetchStudents();
        setEditId(null);
        setEditStudent({ name: '', age: '', branch: '', course: '', fee: '' });
      })
      .catch(error => {
        console.error('Error updating student:', error);
        setError('Failed to update student.');
      });
  };

  return (
    <div style={{ fontFamily: 'Segoe UI', maxWidth: '700px', margin: '40px auto', padding: '20px', backgroundColor: '#f0f0f5', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '28px', color: '#333', marginBottom: '20px' }}>
        🎓 <strong>Student Records</strong>
      </h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={addStudent} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input type="text" name="name" value={newStudent.name} onChange={handleChange} placeholder="Name" required />
        <input type="number" name="age" value={newStudent.age} onChange={handleChange} placeholder="Age" required />
        <input type="text" name="branch" value={newStudent.branch} onChange={handleChange} placeholder="Branch" required />
        <input type="text" name="course" value={newStudent.course} onChange={handleChange} placeholder="Course" required />
        <input type="number" name="fee" value={newStudent.fee} onChange={handleChange} placeholder="Fee" required />
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Add Student</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(student => (
          <li key={student.id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
            {editId === student.id ? (
              <form onSubmit={updateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="text" name="name" value={editStudent.name} onChange={handleEditChange} required />
                <input type="number" name="age" value={editStudent.age} onChange={handleEditChange} required />
                <input type="text" name="branch" value={editStudent.branch} onChange={handleEditChange} required />
                <input type="text" name="course" value={editStudent.course} onChange={handleEditChange} required />
                <input type="number" name="fee" value={editStudent.fee} onChange={handleEditChange} required />
                <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '8px', border: 'none', borderRadius: '5px' }}>Update</button>
              </form>
            ) : (
              <>
                <h4>{student.name}</h4>
                <p>🧑 Age: {student.age}</p>
                <p>🏫 Branch: {student.branch}</p>
                <p>📘 Course: {student.course}</p>
                <p>💰 Fee: ₹{student.fee}</p>
                <button onClick={() => startEdit(student)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deleteStudent(student.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddStudent;
