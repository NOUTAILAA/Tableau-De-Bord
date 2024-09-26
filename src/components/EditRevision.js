import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AddRevision.css'; // Assurez-vous d'importer le fichier CSS si nécessaire

function EditRevision() {
  const { id } = useParams(); // Récupérer l'ID de la révision depuis l'URL
  const [formData, setFormData] = useState({
    type_moteur: '',
    N_SERIE: '',
    ENGIN_DE_DEPOSE: '',
    MINE: '',
    DATE_entree: '',
    cause_de_depose: '',
    HM_MOTEUR_MACHINE: '',
    DATE_REVISION: '',
    Type_revision: '',
    reviser_par: '',
    date_expedition: '',
    date_mise_en_service: '',
    ENGIN_DE_POSE: '',
    SITE_pose: '',
    HM_MACHINE_DE_POSE: '',
    Num_DOSSIER_DE_Revision: '',
    Observation: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/revision/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the revision!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/revision/${id}`, formData)
      .then(response => {
        console.log('Revision updated successfully:', response.data);
        navigate(`/revision/${id}`); // Rediriger vers la page des détails après mise à jour
      })
      .catch(error => {
        console.error('There was an error updating the revision!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Revision</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type_moteur" className="form-label">Type Moteur</label>
          <input
            type="text"
            id="type_moteur"
            name="type_moteur"
            value={formData.type_moteur}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="N_SERIE" className="form-label">N Série</label>
          <input
            type="text"
            id="N_SERIE"
            name="N_SERIE"
            value={formData.N_SERIE}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ENGIN_DE_DEPOSE" className="form-label">Engin de Dépose</label>
          <input
            type="text"
            id="ENGIN_DE_DEPOSE"
            name="ENGIN_DE_DEPOSE"
            value={formData.ENGIN_DE_DEPOSE}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="MINE" className="form-label">MINE</label>
          <input
            type="text"
            id="MINE"
            name="MINE"
            value={formData.MINE}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="DATE_entree" className="form-label">Date Entrée</label>
          <input
            type="date"
            id="DATE_entree"
            name="DATE_entree"
            value={formData.DATE_entree}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cause_de_depose" className="form-label">Cause de Dépose</label>
          <input
            type="text"
            id="cause_de_depose"
            name="cause_de_depose"
            value={formData.cause_de_depose}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="HM_MOTEUR_MACHINE" className="form-label">HM Moteur Machine</label>
          <input
            type="text"
            id="HM_MOTEUR_MACHINE"
            name="HM_MOTEUR_MACHINE"
            value={formData.HM_MOTEUR_MACHINE}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="DATE_REVISION" className="form-label">Date Révision</label>
          <input
            type="date"
            id="DATE_REVISION"
            name="DATE_REVISION"
            value={formData.DATE_REVISION}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Type_revision" className="form-label">Type Révision</label>
          <input
            type="text"
            id="Type_revision"
            name="Type_revision"
            value={formData.Type_revision}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reviser_par" className="form-label">Révisé par</label>
          <input
            type="text"
            id="reviser_par"
            name="reviser_par"
            value={formData.reviser_par}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_expedition" className="form-label">Date Expédition</label>
          <input
            type="date"
            id="date_expedition"
            name="date_expedition"
            value={formData.date_expedition}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_mise_en_service" className="form-label">Date Mise en Service</label>
          <input
            type="date"
            id="date_mise_en_service"
            name="date_mise_en_service"
            value={formData.date_mise_en_service}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ENGIN_DE_POSE" className="form-label">Engin de Pose</label>
          <input
            type="text"
            id="ENGIN_DE_POSE"
            name="ENGIN_DE_POSE"
            value={formData.ENGIN_DE_POSE}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="SITE_pose" className="form-label">Site de Pose</label>
          <input
            type="text"
            id="SITE_pose"
            name="SITE_pose"
            value={formData.SITE_pose}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="HM_MACHINE_DE_POSE" className="form-label">HM Machine de Pose</label>
          <input
            type="text"
            id="HM_MACHINE_DE_POSE"
            name="HM_MACHINE_DE_POSE"
            value={formData.HM_MACHINE_DE_POSE}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Num_DOSSIER_DE_Revision" className="form-label">Numéro Dossier de Révision</label>
          <input
            type="text"
            id="Num_DOSSIER_DE_Revision"
            name="Num_DOSSIER_DE_Revision"
            value={formData.Num_DOSSIER_DE_Revision}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Observation" className="form-label">Observation</label>
          <textarea
            id="Observation"
            name="Observation"
            value={formData.Observation}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update Revision</button>
      </form>
    </div>
  );
}

export default EditRevision;
