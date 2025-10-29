import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Configure axios base URL to match AuthContext
axios.defaults.baseURL = 'http://localhost:4000/api';

// Get all rooms
export const getAllRooms = async () => {
  try {
    const response = await axios.get('/rooms');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Get room by ID
export const getRoomById = async (roomId) => {
  try {
    const response = await axios.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await axios.put(`/rooms/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
};


// Enroll in a room
export const enrollRoom = async (roomId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `/rooms/${roomId}/enroll`,
      {},
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data;
  } catch (error) {
    console.error('Error enrolling in room:', error);
    throw error;
  }
};

// Get current user's rooms
// apis.js

export const getUserRooms = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("/myrooms", {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 make sure your backend middleware verifies JWT
      },
    });

    return res.data.data.rooms; // ✅ returns array of rooms
  } catch (error) {
    console.error("Error fetching user rooms:", error.response?.data || error.message);
    throw error;
  }
};

// Ask a question in a room
export const askRoomQuestion = async (roomId, query) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `/rooms/${roomId}`,
      { query },
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data; // expected shape: { status, message }
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};


export const createRoom = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post("/myrooms", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export const deleteRoom = async (roomId) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `/rooms/${roomId}`, // The URL includes the room's ID
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


