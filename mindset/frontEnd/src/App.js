import { Route, Routes, Link} from "react-router-dom";
import './App.css';
import Signup from './Components/LoginSignup/Signup';
import Login from './Components/LoginSignup/Login';
import TeacherDashboard from './Components/TeacherSide/TeacherDashboard';
import CreateRoom from "./Components/TeacherSide/CreateRoom";
import Rooms from "./Components/StudentSide/Rooms";
import StudentRoom from "./Components/StudentSide/StudentRoom";
import MyRooms from "./Components/MyRooms";
import { TeacherRoom } from "./Components/TeacherSide/TeacherRoom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<TeacherDashboard />} />
        <Route path="/CreateRoom" element={<CreateRoom />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/my-rooms" element={<MyRooms />} />
        <Route path="rooms/:id/student" element={<StudentRoom />} />
        <Route path="/rooms/:id/teacher" element={<TeacherRoom />} />
      </Routes>
    </div>
  );
}

export default App;
