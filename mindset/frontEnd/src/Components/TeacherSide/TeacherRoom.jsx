import React, { useEffect, useState } from "react";
// 1. Import useNavigate and deleteRoom
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById, deleteRoom } from "../../api/apis";
import "./TeacherRoom.css";

// Import Recharts components
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const TeacherRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const roomData = await getRoomById(id);
      const topicsArray = Object.entries(roomData.data.room.topicQuestionCount);
      setTopics(topicsArray);
    } catch (err) {
      console.error("Failed to load room", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [id]); // Add 'id' as a dependency

  const handleDelete = async () => {
    
    try {
      setIsDeleting(true);
      await deleteRoom(id);
      alert("Room deleted successfully.");
      // Navigate back to the rooms list (you can change this path)
      navigate("/my-rooms");
    } catch (err)
    {
      console.error("Failed to delete room", err);
      alert("Failed to delete room. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Custom label for Pie Chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    // Return null if percent is 0 to avoid clutter
    if (percent === 0) {
      return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Format data for the pie chart
  const pieChartData = topics.map(([name, value]) => ({
    name,
    value: Number(value),
  }));
  
  // Calculate total questions to check for empty state
  const totalQuestions = pieChartData.reduce((acc, entry) => acc + entry.value, 0);

  // Define colors for each pie slice
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    // We add React.Fragment to render styles and the component side-by-side
    <React.Fragment>
      <div className="teacher-room">
        <div className="teacher-room-header">
          <div>
            <h1 className="title">Student Questions Analysis</h1>
            <p className="subtitle">
              Analyze student questions to identify trends and areas of difficulty.
            </p>
          </div>
          <button
            className="delete-room-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Room"}
          </button>
        </div>

        <div className="chart-card">
          <h2 className="section-title">Question Distribution by Topic</h2>
          
          {/* Check if we have data. If not, show a message. */}
          {totalQuestions > 0 ? (
            <div className="pie-chart-container">
              {/* Use 'aspect' for responsiveness instead of fixed 'height' */}
              <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="80%" // Use percentage for better scaling
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            // This is the empty state message
            <div className="empty-chart-message">
              No question data yet. As students ask questions, their topics will appear here.
            </div>
          )}
        </div>

        <div className="table-card">
          <h2 className="section-title">Top Question Topics</h2>
          <table className="topics-table">
            <thead>
              <tr className="r">
                <th>TOPIC</th>
                <th>NUMBER OF QUESTIONS</th>
              </tr>
            </thead>
            <tbody>
              {topics.map(([topicName, count], idx) => (
                <tr className="r" key={idx}>
                  <td>{topicName}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

// We need a default export for the single-file build
export default TeacherRoom;