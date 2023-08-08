import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Home  from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <section>
      <NoteState>
      <Router>
        <Navbar />
        <Alert msg="this is good"/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </section>
  );
}

export default App;
