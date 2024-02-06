import React, { useMemo } from "react";
const PeerContext = React.createContext(null);

export const usePeer = () => {
  return React.useContext(PeerContext);
};

export const PeerProvider = (props) => {
  const peer = useMemo(() => {
    return new RTCPeerConnection(), [];
  });

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  return (
    <PeerContext.Provider value={{ peer, createOffer }}>
      {props.children}
    </PeerContext.Provider>
  );
};
