import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./components/Landing";
import { Room } from "./components/Room";
import { SocketProvider, PeerProvider } from "./providers/socket";

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
