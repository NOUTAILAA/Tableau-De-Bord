import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RevisionList from './components/RevisionList';
import AddRevision from './components/AddRevision';
import RevisionDetails from './components/RevisionDetails';
import EditRevision from './components/EditRevision'; // Importer le composant d'édition
import './App.css'; // Importer le fichier CSS

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Revision Management</h1>
        <div className="d-flex">
          <nav className="navbar-custom">
            <ul className="nav">
             
             
              <li className="nav-item">
                <Link to="/revision-list" className="nav-link">
                  Revision List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add-revision" className="nav-link">
                  Add Revision
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex-grow-1 ms-4">
            <Routes>
              <Route path="/" element= {<RevisionList />}/>
              <Route path="/add-revision" element={<AddRevision />} />
              <Route path="/revision-list" element={<RevisionList />} />
              <Route path="/revision/:id" element={<RevisionDetails />} />
              <Route path="/revision/edit/:id" element={<EditRevision />} /> {/* Nouvelle route pour l'édition */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
