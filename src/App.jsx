import React,{useState} from "react";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { RoomReservation } from "./components/pages/RoomReservation";
import { Route,Routes } from "react-router-dom";
import { Home } from "./components/Home";


function App() {

  const [user, setUser] = useState(null);
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div>
    <Navbar user={user} />

    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/RoomReservation" element={<RoomReservation user={user}/>} />




    </Routes>
    </div>
  );
}

export default App;
