import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Select, TimePicker, Button, DatePicker, Tooltip} from 'antd';
import dayjs from 'dayjs';
import '../../styles/SearchBars.scss';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {ClearOutlined, SearchOutlined} from '@ant-design/icons';
dayjs.extend(customParseFormat);

const api_url = import.meta.env.VITE_API_URL;

const { RangePicker } = DatePicker;

const SearchBars = ({ onSearch }) => {
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [buildingOptions, setBuildingOptions] = useState([]);
    const [floorOptions, setFloorOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);

    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [selectedFloors, setSelectedFloors] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);

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

    const [timeRange, setTimeRange] = useState(null);

    useEffect(() => {
        // Fetch equipment options
        fetch(`${api_url}/historicalRecords/equipment-options`)
            .then(response => response.json())
            .then(data => setEquipmentOptions(data))
            .catch(error => console.error('Error fetching equipment options:', error));

        // Fetch building options
        fetch(`${api_url}/historicalRecords/building-options`)
            .then(response => response.json())
            .then(data => setBuildingOptions(data))
            .catch(error => console.error('Error fetching building options:', error));

        // Fetch all floor options initially
        fetch(`${api_url}/historicalRecords/floor-options`)
            .then(response => response.json())
            .then(data => setFloorOptions(data))
            .catch(error => console.error('Error fetching floor options:', error));

        // Fetch all area options initially
        fetch(`${api_url}/historicalRecords/area-options`)
            .then(response => response.json())
            .then(data => setAreaOptions(data))
            .catch(error => console.error('Error fetching area options:', error));
    }, []);

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

    const handleFloorChange = (value) => {
        setSelectedFloors(value);

        // Fetch relevant area options based on selected buildings and floors
        fetch(`${api_url}/historicalRecords/area-options?buildings=${selectedBuildings.join(',')}&floors=${value.join(',')}`)
            .then(response => response.json())
            .then(data => setAreaOptions(data))
            .catch(error => console.error('Error fetching filtered area options:', error));
    };

    const handleSearchChange = (key, value) => {
        setSearchTerms(prevTerms => ({ ...prevTerms, [key]: value }));
    };

    const handleDateRangeChange = (dates) => {
        const startDate = dates && dates[0] ? dates[0].format('YYYY-MM-DD') : null;
        const endDate = dates && dates[1] ? dates[1].format('YYYY-MM-DD') : null;
        handleSearchChange('startDate', startDate);
        handleSearchChange('endDate', endDate);
    };

    const handleTimeRangeChange = (times) => {
        const startTime = times && times[0] ? times[0].format('HH:mm:ss') : null;
        const endTime = times && times[1] ? times[1].format('HH:mm:ss') : null;
        handleSearchChange('startTime', startTime);
        handleSearchChange('endTime', endTime);
        setTimeRange(times);
    };

    const handleSearch = () => {
        const defaultStartTime = '00:00:00';
        const defaultEndTime = '23:59:59';

        const startTime = searchTerms.startTime || defaultStartTime;
        const endTime = searchTerms.endTime || defaultEndTime;

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

        fetch(`${api_url}/historicalRecords/table?${searchParams.toString()}`, {
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
            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Search by Equipment"
                value={selectedEquipments}
                onChange={setSelectedEquipments}
                style={{ width: '100%' }}
                options={equipmentOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Search by Building"
                value={selectedBuildings}
                onChange={handleBuildingChange}
                style={{ width: '100%' }}
                options={buildingOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Search by Floor"
                value={selectedFloors}
                onChange={handleFloorChange}
                style={{ width: '100%' }}
                options={floorOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

            <Select
                className="search-bars"
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Search by Area"
                value={selectedAreas}
                onChange={setSelectedAreas}
                style={{ width: '100%' }}
                options={areaOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />

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

// Add prop types validation
SearchBars.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBars;