import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Upload } from './pages/Upload';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import './styles/tailwind.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/processing/:jobId" element={<Processing />} />
            <Route path="/report/:jobId" element={<Report />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
