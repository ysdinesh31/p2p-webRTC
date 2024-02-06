import { useEffect } from "react";
import { useSocket } from "../providers/socket";

export const Room = () => {
  const { socket } = useSocket();
  useEffect(() => {
    socket.on("joined-room");
  });
  return <div className="room-container">Room</div>;
};
