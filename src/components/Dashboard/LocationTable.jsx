import { useState, useEffect } from 'react';
import SearchBarRecords from './SearchBarRecords';
import DownloadButton from './DownloadButton';
import '../../styles/LocationTable.scss';
import '../../styles/DownloadButton.scss';

const api_url = import.meta.env.VITE_API_URL;

const TableComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = () => {
        fetch(`${api_url}/dashboard/table`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    };

    const handleSearch = (searchResults) => {
        setData(searchResults);
    };

    return (
        <div className="table-container">
            <SearchBarRecords onSearch={handleSearch} />
            <table>
                <thead>
                    <tr>
                        <th>Move No</th>
                        <th>Equipment Name</th>
                        <th>Floor</th>
                        <th>Area</th>
                        <th>Time</th>
                        <th>Access Footage</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                            <td>{row[4]}</td>
                            <td><a href="#">{row[5]}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DownloadButton data={data} />
        </div>
        
    );
};

export default TableComponent;