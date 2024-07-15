import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
    return (
        <div className="home-container">
            <div className="home-section">
                <div className="centered-rectangle">
                    <h1>Rooms reservation page</h1>
                    <p className="dashboard-description">
                        The room reservation page allow you, to choose which room is align with you to reserve 
                        you can reserve a room that allow 2, 4, 6 patrons to use it.

                    </p>
                    <Link to="/RoomReservation" className="dashboard-button">Go to the Rooms page</Link>

                </div>
            </div>
        </div>
    );
};
