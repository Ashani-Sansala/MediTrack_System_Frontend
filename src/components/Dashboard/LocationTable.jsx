import { useState, useEffect, useMemo } from 'react'; 
import { Table } from 'antd'; 
import SearchBars from './SearchBar'; 
import axios from 'axios'; 
import DownloadButton from './DownloadButton'; 
import '../../styles/LocationTable.scss'; 
import '../../styles/DownloadButton.scss'; 

const api_url = import.meta.env.VITE_API_URL; // Accessing API URL from environment variables

// Column configuration for the Ant Design Table component
const columns = [
  {
    title: 'Move No',
    dataIndex: 'moveNo',
    key: 'moveNo',
  },
  {
    title: 'Equipment',
    dataIndex: 'equipment',
    key: 'equipment',
  },
  {
    title: 'Building',
    dataIndex: 'building',
    key: 'building',
  },
  {
    title: 'Floor',
    dataIndex: 'floor',
    key: 'floor',
  },
  {
    title: 'Area',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: 'Direction',
    dataIndex: 'direction',
    key: 'direction',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Access Frame',
    dataIndex: 'accessFrame',
    key: 'accessFrame',
    render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Access Frame Here</a>, // Render function for rendering access footage as a link
  },
];

// TableComponent functional component
const TableComponent = () => {
    const [data, setData] = useState([]); // State for storing table data

    useEffect(() => {
        fetchInitialData(); // Fetch initial data when component mounts
    }, []);

    // Function to fetch initial data from the API
    const fetchInitialData = () => {
      axios.get(`${api_url}/dashboard/table`)
        .then(response => {
          const data = response.data;
          // Format the received data into the structure expected by the Table component
          const formattedData = data.map((row, index) => ({
            key: index.toString(),
            moveNo: row[0],
            equipment: row[1],
            building: row[2],
            floor: row[3],
            area: row[4],
            direction: row[5],
            time: formatTime(row[6]), // Format time using formatTime function
            accessFrame: row[7]
          }));
          setData(formattedData); // Update state with formatted data
        })
        .catch(error => console.error('Error:', error)); // Log any errors
    };

    // Function to handle search results and format them for display in the table
    const handleSearch = (searchResults) => {
        const formattedSearchResults = searchResults.map((row, index) => ({
          key: index.toString(),
          moveNo: row[0],
          equipment: row[1],
          building: row[2],
          floor: row[3],
          area: row[4],
          direction: row[5],
          time: formatTime(row[6]), // Format time using formatTime function
          accessFrame: row[7]
        }));
        setData(formattedSearchResults); // Update state with formatted search results
    };

    // Memoized function to format time from seconds to hh:mm:ss format
    const formatTime = useMemo(() => {
        return (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            
            const pad = (num) => num.toString().padStart(2, '0'); // Helper function to pad numbers
            
            return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
        };
    }, []);

    return (
        <div>
            <SearchBars onSearch={handleSearch} /> {/* Render the SearchBars component and pass handleSearch as a prop */}
            <div className='table-container'>
              <Table 
                  columns={columns} 
                  dataSource={data} 
                  pagination={{ // Pagination configuration for the Ant Design Table
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['20', '50', '100'],
                  }}
              />

              <DownloadButton data={data} /> {/* Render the DownloadButton component and pass data as a prop */}
            </div>
        </div>
    );
};

export default TableComponent; 
