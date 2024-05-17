import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { Input } from 'antd';
import '../../styles/SearchBars.scss';
import API_URL from '../../API';

const api_url = API_URL;

const SearchBars = ({ onSearch }) => {

    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [floorOptions, setFloorOptions] = useState([]);

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
    
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedFloors, setSelectedFloors] = useState([]);

    const availableEquipments = equipmentOptions.filter(
    (equipment) => !selectedEquipments.includes(equipment));

    const availableFloors = floorOptions.filter(
    (floor) => !selectedFloors.includes(floor));


    const [searchTerms, setSearchTerms] = useState({
        eqpName: '',
        floor: '',
        area: '',
        time_:'',
    });

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
            maxTagCount='responsive'
            placeholder="Seach by Equipment Name"
            value={selectedEquipments}
            onChange={setSelectedEquipments}
            style={{
                width: '100%'
            }}
            options={availableEquipments.map((item) => ({
                value: item,
                label: item,
            }))}
        />

        <Select
            className="search-bars"
            mode="multiple"
            maxTagCount='responsive'
            placeholder="Seach by Floor No"
            value={selectedFloors}
            onChange={setSelectedFloors}
            style={{
                width: '100%',
            }}
            options={availableFloors.map((item) => ({
                value: item,
                label: item,
            }))}
        />
        
        <Input 
            placeholder="Search by Area" 
            onChange={(e) => handleSearchChange('area', e.target.value)}

        />
        
        <Input 
            placeholder="Search by Time" 
            onChange={(e) => handleSearchChange('time_', e.target.value)}

        />

        <button className="search-button" onClick={handleSearch}>Search</button>

        </div>
    );
};

export default SearchBars;