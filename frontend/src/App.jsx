import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./components/Landing";
import { Room } from "./components/Room";
import { SocketProvider } from "./providers/socket";
import { PeerProvider } from "./providers/peer";

function App() {
  return (
    <div>
      <SocketProvider>
        <PeerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/room/:roomId" element={<Room />} />
            </Routes>
          </BrowserRouter>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
