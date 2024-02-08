import { useEffect, useCallback, useState } from "react";
import { useSocket } from "../providers/socket";
import { usePeer } from "../providers/peer";
import ReactPlayer from "react-player";

export const Room = () => {
  const { socket } = useSocket();
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    sendStream,
    remoteStream,
  } = usePeer();
  const [myStream, setMyStream] = useState();
  const [remoteEmail, setRemoteEmail] = useState();

  const handleNegotiation = useCallback(async () => {
    const localOffer = await peer.createOffer();
    socket.emit("send-offer", { name: remoteEmail, offer: localOffer });
  });

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegotiation);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiation);
    };
  });

  const handleUserEntered = useCallback(async ({ name }) => {
    console.log("user entered", name);
    const offer = await createOffer();
    socket.emit("send-offer", { name, offer });
    setRemoteEmail(name);
  });

  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    console.log("got offer from ", from, offer);
    const answer = await createAnswer(offer);
    console.log("call accepted from ", from, answer);
    socket.emit("offer-accepted", { from: from, answer: answer });
  });

  const handleCallAccepted = useCallback(async ({ answer }) => {
    console.log("recieved answer ", answer);
    await setRemoteAnswer(answer);
  });

  const getUserStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  });

  useEffect(() => {
    getUserStream();
  }, []);

  useEffect(() => {
    socket.on("user-entered", handleUserEntered);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("offer-accepted", handleCallAccepted);
    return () => {
      socket.off("user-entered", handleUserEntered);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("offer-accepted", handleCallAccepted);
    };
  });
  return (
    <div className="room-container">
      <button onClick={(e) => sendStream(myStream)}>Send my video</button>
      <ReactPlayer url={myStream} playing muted />
      <ReactPlayer url={remoteStream} playing />
    </div>
  );
};
