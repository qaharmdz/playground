import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Filter from './pages/Filter';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
