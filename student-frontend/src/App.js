import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = "http://localhost:8080/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', email: '', course: '' });

  const fetchStudents = () => axios.get(API).then(res => setStudents(res.data));
  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      axios.put(`${API}/${form.id}`, form).then(() => { fetchStudents(); resetForm(); });
    } else {
      axios.post(API, form).then(() => { fetchStudents(); resetForm(); });
    }
  };

  const resetForm = () => setForm({ id: null, name: '', email: '', course: '' });
  const editStudent = (s) => setForm(s);
  const deleteStudent = (id) => axios.delete(`${API}/${id}`).then(fetchStudents);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Student Management System (Skill 12)</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{marginRight: '10px'}} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{marginRight: '10px'}} />
        <input placeholder="Course" value={form.course} onChange={e => setForm({...form, course: e.target.value})} required style={{marginRight: '10px'}} />
        <button type="submit" style={{backgroundColor: '#4CAF50', color: 'white', padding: '5px 15px'}}>{form.id ? "Update" : "Add"} Student</button>
        {form.id && <button onClick={resetForm} style={{marginLeft: '5px'}}>Cancel</button>}
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th>Name</th><th>Email</th><th>Course</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td><td>{s.email}</td><td>{s.course}</td>
              <td>
                <button onClick={() => editStudent(s)} style={{marginRight: '5px'}}>Edit</button>
                <button onClick={() => deleteStudent(s.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
