import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, TimePicker, Button, DatePicker, Tooltip } from 'antd';
import dayjs from 'dayjs';
import '../../styles/SearchBars.scss';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
dayjs.extend(customParseFormat); // Extend dayjs with customParseFormat plugin

const api_url = import.meta.env.VITE_API_URL; // Base API URL

const { RangePicker } = DatePicker; // Destructure RangePicker from DatePicker

const SearchBars = ({ onSearch }) => {
    // States to store options for each search criteria
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [buildingOptions, setBuildingOptions] = useState([]);
    const [floorOptions, setFloorOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);

    // States to store selected values for each search criteria
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [selectedFloors, setSelectedFloors] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);

    // State to store search terms
    const [searchTerms, setSearchTerms] = useState({
        eqpName: null,
        buildingName: null,
        floorNo: null,
        areaName: null,
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
    });

    // State to store time range
    const [timeRange, setTimeRange] = useState(null);

    useEffect(() => {
        // Fetch equipment options from the API
        fetch(`${api_url}/historicalRecords/equipment-options`)
            .then(response => response.json())
            .then(data => setEquipmentOptions(data))
            .catch(error => console.error('Error fetching equipment options:', error));

        // Fetch building options from the API
        fetch(`${api_url}/historicalRecords/building-options`)
            .then(response => response.json())
            .then(data => setBuildingOptions(data))
            .catch(error => console.error('Error fetching building options:', error));

        // Fetch all floor options initially from the API
        fetch(`${api_url}/historicalRecords/floor-options`)
            .then(response => response.json())
            .then(data => setFloorOptions(data))
            .catch(error => console.error('Error fetching floor options:', error));

        // Fetch all area options initially from the API
        fetch(`${api_url}/historicalRecords/area-options`)
            .then(response => response.json())
            .then(data => setAreaOptions(data))
            .catch(error => console.error('Error fetching area options:', error));
    }, []);

    // Handle building change and fetch relevant floor and area options based on selected buildings
    const handleBuildingChange = (value) => {
        setSelectedBuildings(value);

        // Fetch relevant floor options based on selected buildings
        fetch(`${api_url}/historicalRecords/floor-options?buildings=${value.join(',')}`)
            .then(response => response.json())
            .then(data => setFloorOptions(data))
            .catch(error => console.error('Error fetching filtered floor options:', error));

        // Fetch relevant area options based on selected buildings
        fetch(`${api_url}/historicalRecords/area-options?buildings=${value.join(',')}`)
            .then(response => response.json())
            .then(data => setAreaOptions(data))
            .catch(error => console.error('Error fetching filtered area options:', error));
    };

    // Handle floor change and fetch relevant area options based on selected buildings and floors
    const handleFloorChange = (value) => {
        setSelectedFloors(value);

        // Fetch relevant area options based on selected buildings and floors
        fetch(`${api_url}/historicalRecords/area-options?buildings=${selectedBuildings.join(',')}&floors=${value.join(',')}`)
            .then(response => response.json())
            .then(data => setAreaOptions(data))
            .catch(error => console.error('Error fetching filtered area options:', error));
    };

    // Handle changes in search terms
    const handleSearchChange = (key, value) => {
        setSearchTerms(prevTerms => ({ ...prevTerms, [key]: value }));
    };

    // Handle changes in date range
    const handleDateRangeChange = (dates) => {
        const startDate = dates && dates[0] ? dates[0].format('YYYY-MM-DD') : null;
        const endDate = dates && dates[1] ? dates[1].format('YYYY-MM-DD') : null;
        handleSearchChange('startDate', startDate);
        handleSearchChange('endDate', endDate);
    };

    // Handle changes in time range
    const handleTimeRangeChange = (times) => {
        const startTime = times && times[0] ? times[0].format('HH:mm:ss') : null;
        const endTime = times && times[1] ? times[1].format('HH:mm:ss') : null;
        handleSearchChange('startTime', startTime);
        handleSearchChange('endTime', endTime);
        setTimeRange(times);
    };

    // Handle search action
    const handleSearch = () => {
        const defaultStartTime = '00:00:00'; // Default start time if none is selected
        const defaultEndTime = '23:59:59'; // Default end time if none is selected

        const startTime = searchTerms.startTime || defaultStartTime;
        const endTime = searchTerms.endTime || defaultEndTime;

        // Create search parameters
        const searchParams = new URLSearchParams({
            eqpName: selectedEquipments.toString(),
            buildingName: selectedBuildings.toString(),
            floorNo: selectedFloors.toString(),
            areaName: selectedAreas.toString(),
            startDate: searchTerms.startDate || '',
            endDate: searchTerms.endDate || '',
            startTime: startTime,
            endTime: endTime,
        });

        // Fetch search results and update the data in the parent component
        fetch(`${api_url}/historicalRecords/table?${searchParams.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                onSearch(data); // Pass data to parent component's onSearch function
            })
            .catch(error => console.error('Error:', error));
    };

    // Handle clear action to reset all selections
    const handleClear = () => {
        setSelectedEquipments([]);
        setSelectedBuildings([]);
        setSelectedFloors([]);
        setSelectedAreas([]);
        setTimeRange(null);
        setSearchTerms({
            eqpName: null,
            buildingName: null,
            floorNo: null,
            areaName: null,
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
        });
    };

    return (
        <div className="search-bars-container">
            {/* Select input for equipment */}
            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Select Equipment"
                value={selectedEquipments}
                onChange={setSelectedEquipments}
                style={{ width: '100%' }}
                options={equipmentOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            {/* Select input for buildings */}
            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Select Building"
                value={selectedBuildings}
                onChange={handleBuildingChange}
                style={{ width: '100%' }}
                options={buildingOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            {/* Select input for floors */}
            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Select Floor"
                value={selectedFloors}
                onChange={handleFloorChange}
                style={{ width: '100%' }}
                options={floorOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            {/* Select input for areas */}
            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Select Area"
                value={selectedAreas}
                onChange={setSelectedAreas}
                style={{ width: '100%' }}
                options={areaOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            {/* Date range picker for selecting start and end dates */}
            <RangePicker
                placeholder={['Start Date', 'End Date']}
                onChange={handleDateRangeChange}
                value={searchTerms.startDate && searchTerms.endDate ? [dayjs(searchTerms.startDate, 'YYYY-MM-DD'), dayjs(searchTerms.endDate, 'YYYY-MM-DD')] : []}
                style={{ width: '100%' }}
            />

            {/* Time range picker for selecting start and end time */}
            <TimePicker.RangePicker
                placeholder={['Start', 'End']}
                onChange={handleTimeRangeChange}
                value={timeRange}
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                style={{ width: '100%' }}
            />

            {/* Button to trigger search */}
            <Button type="primary" className='search-button' onClick={handleSearch} icon={<SearchOutlined />}>
                Search
            </Button>

            {/* Button to clear all selections */}
            <Tooltip title="Clear">
                <Button
                    type="primary"
                    className='clear-button'
                    onClick={handleClear}
                    icon={<ClearOutlined />}
                    style={{ width: '40px', padding: '10px' }}
                />
            </Tooltip>
        </div>
    );
};

// Add prop types validation
SearchBars.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBars;
