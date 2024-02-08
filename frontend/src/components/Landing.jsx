import "./Landing.css";
import { useSocket } from "../providers/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  }, [socket]);

  const handleJoinRoom = () => {
    console.log("here", socket);
    if (socket) {
      socket.emit("join-room", { name: name, roomId: room });
    }
  };

  const handleRoomJoined = ({ roomId }) => {
    console.log(roomId);
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <div className="landing">
        <div className="input-fields">
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Enter room"
            onChange={(e) => setRoom(e.target.value)}
          ></input>
        </div>
        <button className="join-button" onClick={() => handleJoinRoom()}>
          Join Room
        </button>
      </div>
    </>
  );
};
