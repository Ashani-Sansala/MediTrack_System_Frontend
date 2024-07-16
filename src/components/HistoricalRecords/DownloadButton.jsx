import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/DownloadButton.scss';

const DownloadButton = ({ data }) => {
    // Function to generate and download PDF
    const downloadPdf = () => {
        const doc = new jsPDF(); // Create a new jsPDF instance

        // Generate table with headers and data
        doc.autoTable({
            head: [['Move No', 'Equipment', 'Building', 'Floor', 'Area', 'Date', 'Time']],
            body: data.map(row => [
                row.moveNo,
                row.equipment,
                row.building,
                row.floor,
                row.area,
                row.date,
                row.time
            ]),
        });

        // Save the generated PDF with the filename 'table.pdf'
        doc.save('historicalRecords.pdf');
    };

    return (
        // Button to trigger PDF download
        <button className="download-button" onClick={downloadPdf}>
            Download PDF
        </button>
    );
};

export default DownloadButton;
