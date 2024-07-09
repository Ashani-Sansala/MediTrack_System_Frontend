import LocationTable from '../../components/Dashboard/LocationTable'; 
import './Dashboard.scss';


const Dashboard = () => {

  return (
    <div class='container'>
      <h1>Dashboard</h1>
        <LocationTable/> {/* Render the LocationTable component */}
    </div>
  );
};

export default Dashboard;
