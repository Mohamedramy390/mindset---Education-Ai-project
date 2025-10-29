import React, { useState } from 'react';
import './CreateRoom.css';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../api/apis';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError('')
    setLoading(true)
    try {
        const formData = new FormData();
        formData.append("name", roomName);
        formData.append("topic", topic);
        formData.append("file", file);
        const newRoom = await createRoom(formData);
        navigate('/my-rooms')

        console.log(newRoom)
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Create failed'
        setError(message)
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="create-room-container">
      <div className="create-room-card">
        <h2>Create a New Room</h2>
        <p className="subtitle">Fill in the details below to create a new virtual classroom.</p>

        <form onSubmit={handleSubmit}>
          <label>Room Name</label>
          <input
            type="text"
            placeholder="e.g., Grade 10 - Physics"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />

          <label>Topic</label>
          <input
            type="text"
            placeholder="e.g., Kinematics"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          <label>Upload Documents</label>
          <div className="upload-box">
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.pdf"
            />
            <label htmlFor="fileUpload" className="upload-label">
              {file ? (
                <span>{file.name}</span>
              ) : (
                <>
                  <strong>Upload a file</strong> or drag and drop
                  <div className="upload-hint">PNG, JPG, PDF up to 10MB</div>
                </>
              )}
            </label>
          </div>

          <button type="submit" disabled={loading} className="create-room-btn">
            {loading ? 'Creating The Room ...':'Create Room'}
          </button>
          <button onClick={() => navigate('/my-rooms')} disabled={loading} className="create-room-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
