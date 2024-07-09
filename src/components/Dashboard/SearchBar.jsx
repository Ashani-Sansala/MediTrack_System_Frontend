import { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types'; 
import { Select, TimePicker, Button, Tooltip } from 'antd'; 
import dayjs from 'dayjs'; 
import '../../styles/SearchBars.scss'; 
import customParseFormat from 'dayjs/plugin/customParseFormat'; 
import { SearchOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons'; 
import axios from 'axios'; 

dayjs.extend(customParseFormat); // Extending dayjs with customParseFormat plugin

const api_url = import.meta.env.VITE_API_URL; // Accessing API URL from environment variables

const SearchBars = ({ onSearch }) => {
    // State variables for options and selected values
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [buildingOptions, setBuildingOptions] = useState([]);
    const [floorOptions, setFloorOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);

    // State variables for selected options
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [selectedFloors, setSelectedFloors] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);

    // State variable for search terms
    const [searchTerms, setSearchTerms] = useState({
        eqpName: null,
        buildingName: null,
        floorNo: null,
        areaName: null,
        startTime: null,
        endTime: null,
    });

    // State variable for time range
    const [timeRange, setTimeRange] = useState(null);

    useEffect(() => {
        // Fetch equipment options
        axios.get(`${api_url}/dashboard/equipment-options`)
            .then(response => setEquipmentOptions(response.data))
            .catch(error => console.error('Error fetching equipment options:', error));

        // Fetch building options
        axios.get(`${api_url}/dashboard/building-options`)
            .then(response => setBuildingOptions(response.data))
            .catch(error => console.error('Error fetching building options:', error));

        // Fetch all floor options initially
        axios.get(`${api_url}/dashboard/floor-options`)
            .then(response => setFloorOptions(response.data))
            .catch(error => console.error('Error fetching floor options:', error));

        // Fetch all area options initially
        axios.get(`${api_url}/dashboard/area-options`)
            .then(response => setAreaOptions(response.data))
            .catch(error => console.error('Error fetching area options:', error));
    }, []); 

    // Handler for building selection change
    const handleBuildingChange = (value) => {
        setSelectedBuildings(value);

        // Fetch relevant floor options based on selected buildings
        axios.get(`${api_url}/dashboard/floor-options`, {
            params: { buildings: value.join(',') }
        })
            .then(response => setFloorOptions(response.data))
            .catch(error => console.error('Error fetching filtered floor options:', error));

        // Fetch relevant area options based on selected buildings
        axios.get(`${api_url}/dashboard/area-options`, {
            params: { buildings: value.join(',') }
        })
            .then(response => setAreaOptions(response.data))
            .catch(error => console.error('Error fetching filtered area options:', error));
    };

    // Handler for floor selection change
    const handleFloorChange = (value) => {
        setSelectedFloors(value);

        // Fetch relevant area options based on selected buildings and floors
        axios.get(`${api_url}/dashboard/area-options`, {
            params: {
                buildings: selectedBuildings.join(','),
                floors: value.join(',')
            }
        })
            .then(response => setAreaOptions(response.data))
            .catch(error => console.error('Error fetching filtered area options:', error));
    };

    // Handler for updating search terms
    const handleSearchChange = (key, value) => {
        setSearchTerms(prevTerms => ({ ...prevTerms, [key]: value }));
    };

    // Handler for time range selection change
    const handleTimeRangeChange = (times) => {
        setTimeRange(times);
        const startTime = times && times[0] ? times[0].format('HH:mm:ss') : null;
        const endTime = times && times[1] ? times[1].format('HH:mm:ss') : null;
        handleSearchChange('startTime', startTime);
        handleSearchChange('endTime', endTime);
    };

    // Handler for initiating search
    const handleSearch = () => {
        const defaultStartTime = '00:00:00';
        const defaultEndTime = '23:59:59';

        const startTime = searchTerms.startTime || defaultStartTime;
        const endTime = searchTerms.endTime || defaultEndTime;

        // Constructing search parameters for API call
        const searchParams = new URLSearchParams({
            eqpName: selectedEquipments.toString(),
            buildingName: selectedBuildings.toString(),
            floorNo: selectedFloors.toString(),
            areaName: selectedAreas.toString(),
            startTime: startTime,
            endTime: endTime,
        });

        // Making POST request to fetch filtered data based on search parameters
        axios.post(`${api_url}/dashboard/table?${searchParams.toString()}`)
            .then(response => {
                // Update the data in the parent component (TableComponent) with filtered results
                onSearch(response.data);
            })
            .catch(error => console.error('Error:', error));
    };

    // Handler for clearing all selections and resetting state
    const handleClear = () => {
        setSelectedEquipments([]);
        setSelectedBuildings([]);
        setSelectedFloors([]);
        setSelectedAreas([]);
        setTimeRange(null);
    };

    // Handler for refreshing the page
    const handleRefresh = () => {
        window.location.reload();
    };

    // Rendering the component
    return (
        <div className="search-bars-container">
            {/* Button to refresh the page */}
            <Tooltip title="Refresh">
                <Button 
                    type="primary" 
                    className='refresh-button' 
                    onClick={handleRefresh} 
                    icon={<ReloadOutlined />}
                    style={{ width: '40px', padding:'10px' }}
                />
            </Tooltip>

            {/* Select component for choosing equipment */}
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

            {/* Select component for choosing building */}
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

            {/* Select component for choosing floor */}
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

            {/* Select component for choosing area */}
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

            {/* Time range picker for selecting start and end time */}
            <TimePicker.RangePicker 
                placeholder={['Start', 'End']}
                onChange={handleTimeRangeChange}
                value={timeRange}
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                style={{ width: '100%' }}
            />

            {/* Button to initiate search */}
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
                    style={{ width: '40px', padding:'10px' }}
                />
            </Tooltip>
        </div>
    );
};

// Prop types validation for SearchBars component
SearchBars.propTypes = {
    onSearch: PropTypes.func.isRequired, // onSearch prop must be a function and is required
};

export default SearchBars; 
