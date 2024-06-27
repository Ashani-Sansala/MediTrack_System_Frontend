import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, DatePicker } from 'antd';
import '../../styles/SearchBars.scss';

const api_url = import.meta.env.VITE_API_URL;

const SearchBars = ({ onSearch }) => {
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [floorOptions, setFloorOptions] = useState([]);
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedFloors, setSelectedFloors] = useState([]);
    const [searchTerms, setSearchTerms] = useState({
        eqpName: '',
        floor: '',
        area: '',
        time_: '',
        date: '',
    });

    useEffect(() => {
        // Fetch equipment options
        fetch(`${api_url}/dashboard/equipment-options`)
            .then(response => response.json())
            .then(data => setEquipmentOptions(data))
            .catch(error => console.error('Error fetching equipment options:', error));

        // Fetch floor options
        fetch(`${api_url}/dashboard/floor-options`)
            .then(response => response.json())
            .then(data => setFloorOptions(data))
            .catch(error => console.error('Error fetching floor options:', error));
    }, []);

    const availableEquipments = equipmentOptions.filter(
        equipment => !selectedEquipments.includes(equipment)
    );

    const availableFloors = floorOptions.filter(
        floor => !selectedFloors.includes(floor)
    );

    const handleSearchChange = (key, value) => {
        setSearchTerms(prevTerms => ({ ...prevTerms, [key]: value }));
    };

    const handleSearch = () => {
        handleSearchChange('eqpName', selectedEquipments.toString());
        handleSearchChange('floor', selectedFloors.toString());

        const searchParams = new URLSearchParams(searchTerms);
        fetch(`${api_url}/dashboard/table?${searchParams.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the data in the parent component (TableComponent)
                onSearch(data);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="search-bars-container">
            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Search by Equipment Name"
                value={selectedEquipments}
                onChange={setSelectedEquipments}
                style={{ width: '100%' }}
                options={availableEquipments.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Search by Floor No"
                value={selectedFloors}
                onChange={setSelectedFloors}
                style={{ width: '100%' }}
                options={availableFloors.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            <Input
                placeholder="Search by Area"
                onChange={e => handleSearchChange('area', e.target.value)}
            />

            <DatePicker
                placeholder="Search by Date"
                onChange={(date, dateString) => handleSearchChange('date', dateString)}
                style={{ width: '100%' }}
            />

            <Input
                placeholder="Search by Time"
                onChange={e => handleSearchChange('time_', e.target.value)}
            />

            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

// Add prop types validation
SearchBars.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBars;
