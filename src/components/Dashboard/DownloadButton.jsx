import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 
import '../../styles/DownloadButton.scss'; 

// DownloadButton takes 'data' as a prop
const DownloadButton = ({ data }) => {
  // Function to generate and download the PDF
  const downloadPdf = () => {
    const doc = new jsPDF(); // Create a new PDF document

    // Adding a table to the PDF
    doc.autoTable({
      head: [['Move No', 'Equipment', 'Building', 'Floor', 'Area', 'Direction', 'Time']], // Table headers
      body: data.map(row => [ // Mapping over the data to create rows for the table
        row.moveNo,        // Move number
        row.equipment,     // Equipment name/type
        row.building,      // Building name/number
        row.floor,         // Floor number
        row.area,          // Area description
        row.direction,     // Direction
        row.time,          // Time of the move
      ]),
    });
    doc.save('detectionLogs.pdf'); // Saving the PDF with the filename 'detectionLogs.pdf'
  };

  // Rendering the button with an onClick handler to download the PDF when clicked
  return (
    <button className="download-button" onClick={downloadPdf}>Download PDF</button>
  );
};

export default DownloadButton; 
