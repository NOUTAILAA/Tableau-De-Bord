import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './RevisionDetails.css'; // Importez le fichier CSS

function RevisionDetails() {
  const { id } = useParams();
  const [revision, setRevision] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/revision/${id}`)
      .then(response => {
        setRevision(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the revision details!', error);
      });
  }, [id]);

  // Fonction pour générer et télécharger le PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Titre du PDF
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128);
    doc.text("Revision Details", 105, 20, { align: "center" });

    // Ajouter une table stylisée avec les détails de la révision
    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['ID', revision.id],
        ['Type Moteur', revision.type_moteur],
        ['N Série', revision.N_SERIE],
        ['ENGIN DE DEPOSE', revision.ENGIN_DE_DEPOSE],
        ['Mine', revision.MINE],
        ['Date Entrée', revision.DATE_entree],
        ['Cause de Depose', revision.cause_de_depose],
        ['HM Moteur Machine', revision.HM_MOTEUR_MACHINE],
        // Ajoutez d'autres champs si nécessaire
      ],
      styles: {
        fontSize: 12,
        textColor: [0, 0, 0],
        fillColor: [220, 220, 220],
      },
      headStyles: {
        fillColor: [0, 0, 128],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 40 }, // Largeur de la première colonne
        1: { cellWidth: 100 }, // Largeur de la deuxième colonne
      },
    });

    // Ajouter des notes en bas du PDF
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Generated using jsPDF", 105, doc.internal.pageSize.height - 10, { align: "center" });

    // Télécharger le PDF
    doc.save(`Revision_Details_${revision.id}.pdf`);
  };

  if (!revision) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Revision Details</h2>
      <div>
        <p><strong>Type Moteur:</strong> {revision.type_moteur}</p>
        <p><strong>N Série:</strong> {revision.N_SERIE}</p>
        <p><strong>ENGIN DE DEPOSE:</strong> {revision.ENGIN_DE_DEPOSE}</p>
        <p><strong>Mine:</strong> {revision.MINE}</p>
        <p><strong>Date Entrée:</strong> {revision.DATE_entree}</p>
        <p><strong>Cause de Depose:</strong> {revision.cause_de_depose}</p>
        <p><strong>HM Moteur Machine:</strong> {revision.HM_MOTEUR_MACHINE}</p>
        <p><strong>DATE REVISION:</strong> {revision.DATE_REVISION}</p>
        <p><strong>Type De Révision:</strong> {revision.Type_revision}</p>
        <p><strong>Révisé par:</strong> {revision.reviser_par}</p>
        <p><strong>DATE EXPEDITION:</strong> {revision.date_expedition}</p>
        <p><strong>DATE MISE EN SERVICE:</strong> {revision.date_mise_en_service}</p>
        <p><strong>ENGIN DE POSE:</strong> {revision.ENGIN_DE_POSE}</p>
        <p><strong>SITE POSE:</strong> {revision.SITE_pose}</p>
        <p><strong>HM MACHINE DEPOSE:</strong> {revision.HM_MACHINE_DE_POSE}</p>

      </div>
      
      <button className="pdf-button" onClick={generatePDF}>
        Télécharger PDF
      </button>
    </div>
  );
}

export default RevisionDetails;
