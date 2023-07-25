import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Home  from './components/Home';

function App() {
  return (
    <section>
      <Router>
        <Navbar />
        <h4 className='container'>This is iNotebook</h4>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;
