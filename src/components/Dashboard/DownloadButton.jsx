// DownloadButton.js
//import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/DownloadButton.scss';

const DownloadButton = ({ data }) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Move No', 'Equipment Name', 'Floor', 'Area', 'Time', 'Access Footage']],
      body: data.map(row => [row[0], row[1], row[2], row[3], row[4], row[5]]),
    });
    doc.save('table.pdf');
  };

  return (
    <button class="download-button" onClick={downloadPdf}>Download PDF</button>
  );
};

export default DownloadButton;
