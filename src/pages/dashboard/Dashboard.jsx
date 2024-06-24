//import React, { useState, useEffect } from 'react';
import LocationTable from '../../components/Dashboard/LocationTable'; 
import './Dashboard.scss';


const Dashboard = () => {

  return (
    <div class='container'>
      <h1>Dashboard</h1>
        <LocationTable/>
    </div>
  );
};

export default Dashboard;
