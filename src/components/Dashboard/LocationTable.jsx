import React, { useState, useEffect } from 'react';
import '../../styles/LocationTable.scss';
import DownloadButton from './DownloadButton';
import '../../styles/DownloadButton.scss';

const TableComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.148:5000/data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="table-container">
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
