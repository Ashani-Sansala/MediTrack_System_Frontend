import { useState, useEffect, useMemo } from 'react';
import { Table } from 'antd';
import SearchBars from './SearchBarRecord';
import DownloadButton from './DownloadButton';
import '../../styles/LocationTable.scss';
import '../../styles/DownloadButton.scss';

const api_url = import.meta.env.VITE_API_URL;

// Define table columns
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
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
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
        // Render access footage as a clickable link
        render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Access Frame Here</a>,
    },
];

const TableComponent = () => {
    const [data, setData] = useState([]); // State to hold table data

    useEffect(() => {
        fetchInitialData(); // Fetch initial data when component mounts
    }, []);

    // Function to fetch initial data
    const fetchInitialData = () => {
        fetch(`${api_url}/historicalRecords/table`)
            .then(response => response.json())
            .then(data => {
                // Format data for table
                const formattedData = data.map((row, index) => ({
                    key: index.toString(),
                    moveNo: row[0],
                    equipment: row[1],
                    building: row[2],
                    floor: row[3],
                    area: row[4],
                    direction: row[5],
                    date: formatDate(row[6]),
                    time: formatTime(row[7]),
                    accessFrame: row[8]
                }));
                setData(formattedData); // Update state with formatted data
            })
            .catch(error => console.error('Error:', error)); // Handle errors
    };

    // Function to handle search results
    const handleSearch = (searchResults) => {
        // Format search results for table
        const formattedSearchResults = searchResults.map((row, index) => ({
            key: index.toString(),
            moveNo: row[0],
            equipment: row[1],
            building: row[2],
            floor: row[3],
            area: row[4],
            direction: row[5],
            date: formatDate(row[6]),
            time: formatTime(row[7]),
            accessFrame: row[8]
        }));
        setData(formattedSearchResults); // Update state with formatted search results
    };

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString); // Convert date string to Date object
        return date.toLocaleDateString(); // Return formatted date string
    };

    // Memoized function to format time from seconds to HH:MM:SS
    const formatTime = useMemo(() => {
        return (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;

            const pad = (num) => num.toString().padStart(2, '0');

            return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
        };
    }, []);

    return (
        <div>
            <SearchBars onSearch={handleSearch} /> {/* Search bar component */}
            <div className='table-container'>
                <Table
                    columns={columns} // Define table columns
                    dataSource={data} // Provide data source for table
                    pagination={{
                        defaultPageSize: 10, // Default number of rows per page
                        showSizeChanger: true, // Show size changer dropdown
                        pageSizeOptions: ['20', '50', '100'], // Options for number of rows per page
                    }}
                />
                <DownloadButton data={data} /> {/* Button to download table data as PDF */}
            </div>
        </div>
    );
};

export default TableComponent;
