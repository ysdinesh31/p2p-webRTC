import React, { useCallback, useEffect, useMemo, useState } from "react";
const PeerContext = React.createContext(null);

export const usePeer = () => {
  return React.useContext(PeerContext);
};

export const PeerProvider = (props) => {
  const [remoteStream, setRemoteStream] = useState();

  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);

    () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  });

  const handleTrackEvent = useCallback((ev) => {
    const streams = ev.streams;
    setRemoteStream(streams[0]);
  });

  const peer = useMemo(() => {
    return new RTCPeerConnection();
  }, []);

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  };

  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(new RTCSessionDescription(answer));
    return answer;
  };

  const setRemoteAnswer = async (answer) => {
    await peer.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const sendStream = async (stream) => {
    const tracks = stream.getTracks();

    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };
  return (
    <PeerContext.Provider
      value={{
        peer,
        createOffer,
        createAnswer,
        setRemoteAnswer,
        sendStream,
        remoteStream,
      }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};
