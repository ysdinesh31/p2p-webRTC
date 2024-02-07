import { useEffect } from "react";
import { useSocket } from "../providers/socket";
import { usePeer } from "../providers/peer";

export const Room = () => {
  const { socket } = useSocket();
  const { peer, createOffer } = usePeer();
  const handleUserEntered = async ({ name }) => {
    console.log("user entered", name);
    const offer = await createOffer();
    socket.emit("send-offer", { name, offer });
  };
  useEffect(() => {
    socket.on("user-entered", handleUserEntered);
  });
  return <div className="room-container">Room</div>;
};
