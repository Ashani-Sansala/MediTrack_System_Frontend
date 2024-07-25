import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, DatePicker, Tooltip } from 'antd';
import { ReloadOutlined, EditOutlined } from '@ant-design/icons'; 
import dayjs from 'dayjs';
import axios from 'axios';
import { locationRules, ipAddressRules, modelRules, 
        installationDateRules, cameraStatusRules, disableFutureDates } from '../../utils/ValidationRules';
import './ManageCamera.scss'

const { Option } = Select;
const api_url = import.meta.env.VITE_API_URL; // API base URL from environment variables

const dateFormat = 'YYYY-MM-DD'; // Standard date format

const CameraTable = () => {
  const [cameras, setCameras] = useState([]); // State for camera data
  const [cameraCount, setCameraCount] = useState(0); // State for the count of cameras
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [locations, setLocations] = useState([]); // State for location data
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Form instance for adding camera
  const [editForm] = Form.useForm(); // Form instance for editing camera
  const [editingKey, setEditingKey] = useState(''); // State for the currently editing camera key

  // Fetch cameras and locations when component mounts or searchTerm changes
  useEffect(() => {
    fetchCameras();
    fetchLocations();
  }, [searchTerm]); 

  // Fetch cameras from the server
  const fetchCameras = async () => {
    try {
      const response = await axios.get(`${api_url}/manageCamera/getData`, {
        params: { search: searchTerm }
      });
      const formattedCameras = response.data.map(camera => ({
        ...camera,
        installationDate: dayjs(camera.installationDate).format(dateFormat)
      }));
      setCameras(formattedCameras);
      setCameraCount(response.data.length);
    } catch (error) {
      console.error('Error fetching cameras:', error);
      message.error('Error fetching cameras!');
    }
  };

  // Fetch locations from the server
  const fetchLocations = async () => {
    const response = await axios.get(`${api_url}/manageCamera/locationData`);
    setLocations(response.data);
  };

  // Handle adding a new camera
  const handleAdd = async (values) => {
    try {
      const formattedValues = {
        ...values,
        installationDate: values.installationDate.format(dateFormat),
      };
      const response = await axios.post(`${api_url}/manageCamera/add`, formattedValues);
      fetchCameras();
      setIsModalVisible(false);
      form.resetFields();
  
      if (response.data.success) {
        message.success('Camera added successfully');
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error('Something went wrong!');
    }
  };

  // Handle search action
  const handleSearch = () => {
    fetchCameras();
  };

  // Check if a record is being edited
  const isEditing = (record) => record.cameraId === editingKey;

  // Start editing a camera record
  const edit = (record) => {
    editForm.setFieldsValue({ ...record });
    setEditingKey(record.cameraId);
  };

  // Cancel editing
  const cancel = () => {
    setEditingKey('');
  };

  // Save changes to a camera record
  const save = async (cameraId) => {
    try {
      const row = await editForm.validateFields();
      const response = await axios.put(`${api_url}/manageCamera/updateCamera/${cameraId}`, row);
      fetchCameras();
      setEditingKey('');

      if (response.data.success) {
        message.success('Camera updated successfully!');
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error('Something went wrong!');
    }
  };

  // Table columns definition
  const columns = [
    { title: 'Camera ID', dataIndex: 'cameraId', key: 'cameraId' },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      editable: true,
    },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    {
      title: 'Installation Date',
      dataIndex: 'installationDate',
      key: 'installationDate',
      render: (text) => dayjs(text).format(dateFormat)
    },
    { title: 'Building', dataIndex: 'buildingName', key: 'buildingName' },
    { title: 'Floor', dataIndex: 'floorNo', key: 'floorNo' },
    { title: 'Area', dataIndex: 'areaName', key: 'areaName' },
    {
      title: 'Status',
      dataIndex: 'cameraStatus',
      key: 'cameraStatus',
      editable: true,
      render: (status) => {
        let className = '';
        switch (status) {
          case 'Disabled':
            className = 'camera-status-disabled';
            break;
          case 'Active':
            className = 'camera-status-active';
            break;
          case 'Under Maintenance':
            className = 'camera-status-under-maintenance';
            break;
          default:
            break;
        }
        return <span className={className}>{status}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              className='save-button'
              onClick={() => save(record.cameraId)}
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Button className='cancel-button' onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <Button icon={<EditOutlined />} className="edit-button" disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

  // Integrate editable cells in table columns
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'cameraStatus' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // Editable cell component
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'select' ? (
      <Select>
        <Option value="Disabled">Disabled</Option>
        <Option value="Active">Active</Option>
        <Option value="Under Maintenance">Under Maintenance</Option>
      </Select>
    ) : (
      <Input />
    );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please Input ${title}!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // Handler for refreshing the page
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1>Manage Camera</h1>
      <div className="button-container">
        <h3>Cameras: {cameraCount}</h3>
        <Input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="search-button" type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button className='add-camera-button' type="primary" onClick={() => setIsModalVisible(true)}>Add Camera</Button>
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
      </div>
      <Form form={editForm} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={cameras}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey="cameraId"
        />
      </Form>
      <Modal
        title="Add Camera"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAdd}>
          <Form.Item name="locId" label="Location" rules={[...locationRules]}>
            <Select placeholder="Select Location">
              {locations.map((loc) => (
                <Option key={loc.locId} value={loc.locId}>
                  {`${loc.buildingName}, Floor ${loc.floorNo}, ${loc.areaName}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="ipAddress" label="IP Address" rules={[...ipAddressRules]}>
            <Input placeholder="Enter IP Address"/>
          </Form.Item>

          <Form.Item name="model" label="Model" rules={[...modelRules]}>
            <Input placeholder="Enter Model"/>
          </Form.Item>

          <Form.Item name="installationDate" label="Installation Date" rules={[...installationDateRules]}>
            <DatePicker 
              format={dateFormat} 
              disabledDate={disableFutureDates} 
            />
          </Form.Item>

          <Form.Item name="cameraStatus" label="Status" rules={[...cameraStatusRules]}>
            <Select placeholder="Select Status">
              <Option value="Disabled">Disabled</Option>
              <Option value="Active">Active</Option>
              <Option value="Under Maintenance">Under Maintenance</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CameraTable;
