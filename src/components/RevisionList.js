import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './RevisionList.css';

function RevisionList() {
  const [revisions, setRevisions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/revision')
      .then(response => {
        setRevisions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the revisions!', error);
      });
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/revision/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/revision/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this revision?')) {
      axios.delete(`http://localhost:5000/api/revision/${id}`)
        .then(() => {
          setRevisions(revisions.filter(revision => revision.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the revision!', error);
        });
    }
  };

  // Filtered revisions based on search query, with null checks
  const filteredRevisions = revisions.filter(revision => {
    const typeMoteur = revision.type_moteur ? revision.type_moteur.toLowerCase() : '';
    const nSerie = revision.N_SERIE ? revision.N_SERIE.toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    return typeMoteur.includes(query) || nSerie.includes(query);
  });

  // Pagination logic
  const pageCount = Math.ceil(filteredRevisions.length / itemsPerPage);
  const displayedRevisions = filteredRevisions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">List of Revisions</h2>
      <div className="search-container">
        <label htmlFor="search" className="search-label">Search:</label>
        <input
          id="search"
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Type Moteur or N Série"
        />
      </div>
      <table className="table custom-table">
        <thead>
          <tr>
            <th>Type Moteur</th>
            <th>N Série</th>
            <th>Date Entrée</th>
            <th>Date Révision</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedRevisions.map(revision => (
            <tr key={revision.id}>
              <td>{revision.type_moteur}</td>
              <td>{revision.N_SERIE}</td>
              <td>{revision.DATE_entree}</td>
              <td>{revision.DATE_REVISION}</td>
              <td className="action-icons">
                <svg
                  onClick={() => handleDetailsClick(revision.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-eye me-2"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer' }}
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 12.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
                </svg>
                <svg
                  onClick={() => handleEditClick(revision.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-pencil-square me-2"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer' }}
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.236 1.236-2.5-2.5L13.002.147a.5.5 0 0 1 .706 0l1.794 1.794zM1 13.5V16h2.5l7.373-7.373-2.5-2.5L1 13.5zm12.5-6.5L10 7l3 3 1.5-1.5-1-1zm-3.18-3.132L12 4l-6.64 6.64-1.76.88L2 12l.88-1.76L8 4zm-2.154-.396L4 2.073 1.36 1.647a1.5 1.5 0 0 0-1.42 2.242l.513.857 2.15 2.15 1.121-2.55z"/>
                </svg>
                <svg
                  onClick={() => handleDeleteClick(revision.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer' }}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v7.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V6a.5.5 0 0 1 1 0v7.5A1.5 1.5 0 0 1 9.5 15H6.5A1.5 1.5 0 0 1 5 13.5V6a.5.5 0 0 1 .5-.5z"/>
                  <path fillRule="evenodd" d="M3.5 1a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1h2v1h-1v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3H0V2h2V1h1.5zm1-1h7v1h-7V0z"/>
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default RevisionList;
