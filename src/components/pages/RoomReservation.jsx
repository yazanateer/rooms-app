import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../pages/css_pages/room.css";

export const RoomReservation = ({user}) => {
    if (!user) {
        return <Navigate to="/Login" replace />;
        }

   
    return (
        <div className="home-container-room">
            <div className="room-section">
                <h1 className="header_room">Welcome to the Room Reservation</h1>
                <div className="room-card-container">
                    <table className="room-table">
                        <thead>
                            <tr>
                                <th>Room ID</th>
                                <th>Participants</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
