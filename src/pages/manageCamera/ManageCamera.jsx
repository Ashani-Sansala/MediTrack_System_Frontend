import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, DatePicker } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import {locationRules, ipAddressRules, modelRules, 
        installationDateRules, cameraStatusRules} from '../../utils/ValidationRules';
import './ManageCamera.scss'

const { Option } = Select;
const api_url = import.meta.env.VITE_API_URL;

const dateFormat = 'YYYY-MM-DD';

const CameraTable = () => {
  const [cameras, setCameras] = useState([]);
  const [cameraCount, setCameraCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    fetchCameras();
    fetchLocations();
  }, [searchTerm]); 

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

  const fetchLocations = async () => {
    const response = await axios.get(`${api_url}/manageCamera/locationData`);
    setLocations(response.data);
  };

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

  const handleSearch = () => {
    fetchCameras();
  };

  const isEditing = (record) => record.cameraId === editingKey;

  const edit = (record) => {
    editForm.setFieldsValue({ ...record });
    setEditingKey(record.cameraId);
  };

  const cancel = () => {
    setEditingKey('');
  };

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
              onClick={() => save(record.cameraId)}
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

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

  return (
    <div>
      <h1>Manage Camera</h1>
      <div className="button-container">
        <h3>Camera count: {cameraCount}</h3>
        <Input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Camera</Button>
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
            <DatePicker format={dateFormat} />
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
