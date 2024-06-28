import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/DownloadButton.scss';

const DownloadButton = ({ data }) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Move No', 'Equipment', 'Building', 'Floor', 'Area', 'Time', 'Access Footage']],
      body: data.map(row => [
        row.moveNo,
        row.equipment,
        row.building,
        row.floor,
        row.area,
        row.time,
        row.accessFootage
      ]),
    });
    doc.save('table.pdf');
  };

  return (
    <button className="download-button" onClick={downloadPdf}>Download PDF</button>
  );
};

export default DownloadButton;