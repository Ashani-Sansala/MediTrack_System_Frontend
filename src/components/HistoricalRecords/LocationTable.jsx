import { useState, useEffect, useMemo } from 'react';
import { Table } from 'antd';
import SearchBars from './SearchBarRecord';
import DownloadButton from './DownloadButton';
import '../../styles/LocationTable.scss';
import '../../styles/DownloadButton.scss';

const api_url = import.meta.env.VITE_API_URL;

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
        render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Access Frame Here</a>, // Render function for rendering access footage as a link
    },
];

const TableComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = () => {
        fetch(`${api_url}/historicalRecords/table`)
            .then(response => response.json())
            .then(data => {
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
                setData(formattedData);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleSearch = (searchResults) => {
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
        setData(formattedSearchResults);
    };

    // Format date function
    const formatDate = (dateString) => {
        // Assuming dateString is in a format that can be parsed by Date constructor
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Adjust format as needed
    };

    // Convert time drom seconds to time format
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
            <SearchBars onSearch={handleSearch} />
            <div className='table-container'>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['20', '50', '100'],
                    }}
                />

                <DownloadButton data={data} />
            </div>

        </div>
    );
};

export default TableComponent;