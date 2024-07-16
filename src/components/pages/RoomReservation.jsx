import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import "../pages/css_pages/room.css";
import axios from "axios";

export const RoomReservation = ({user}) => {
   
    const [Rooms, setRooms] = useState([]);
    const [userDetails] = useState({ superapp: "citylibrary", email: user ? user.userid.email: "" }); 
    const hasFetchedRef = useRef(false); // Using useRef to track fetch status

    const fetchRoomsByType = async (type) => {
        try {
            const response = await axios.get(`http://localhost:8084/superapp/objects/search/byType/${type}`, {
                params: {
                    userSuperapp: userDetails.superapp,
                    userEmail: userDetails.email,
                    size: 20,
                    page: 0
                },
            });
    
            if (response.data) {
                const rooms = response.data.map((item) => ({
                    id: item.objectDetails.roomId,
                    participants: item.objectDetails.participants,
                    num_room: item.alias,
                    status: type === "Room" ? "Available" : "Reserved"
                }));
                return rooms;
            } else {
                return [];
            }
        } catch (error) {
            console.error(`Error fetching the rooms of type ${type}:`, error);
            return [];
        }
    };

    const handleFetchRooms = async () => {
        try {
            const roomTypes = ["Room", "Reserved_room"];
            let allRooms = [];
    
            for (const type of roomTypes) {
                const rooms = await fetchRoomsByType(type);
                allRooms = [...allRooms, ...rooms];
            }
    
            setRooms(allRooms); // Assuming setRooms is a state updater function
            console.log(allRooms);
    
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setRooms([]); // Handle state update for error case
        }
    };






    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    // Trigger the fetch only once when the component is mounted
    if (!hasFetchedRef.current) {
        handleFetchRooms();
        hasFetchedRef.current = true;
    }


    const handelReserve = async (invokedBy, roomId) => {

        try{
            const response = await axios.post("http://localhost:8084/superapp/miniapp/rooms_miniapp",{
                command: "reserveroom",
                commandAttributes: {
                    roomId: roomId
                }, 
                invokedBy: {
                    email: `${invokedBy}`
                },
                targetObject: {
                    internalObjectId: ""
                }
            });
            console.log(roomId);
            if(response.data) {
                console.log('Response data: ', response.data);
                handleFetchRooms();
            }

        }catch{

        }
    };


    const handleCancelReservation = async (roomId) => {
        try {
            const response = await axios.post(
                "http://localhost:8084/superapp/miniapp/rooms_miniapp",
                {
                    command: "cancelreservation",
                    commandAttributes: {
                        roomId: roomId,
                    },
                    invokedBy: {
                        email: `${userDetails.email}`,
                    },
                    targetObject: {
                        internalObjectId: "",
                    },
                }
            );

            console.log(roomId);
            if (response.data) {
                console.log("Response data:", response.data);
                // Update rooms after cancellation
                handleFetchRooms();
            }
        } catch (error) {
            console.error("Error cancelling reservation:", error);
        }
    };





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
                        {Rooms.map((room) => (
                                <tr key={room.id}>
                                    <td>{room.id}</td>
                                    <td>{room.participants}</td>
                                    <td>{room.status}</td>
                                    {room.status === "Available" ? (
                                            <button
                                                onClick={() =>
                                                    handelReserve(
                                                        userDetails.email,
                                                        room.id
                                                    )
                                                }
                                            >
                                                Reserve
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleCancelReservation(
                                                        room.id
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>
                                        )}
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
