import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./components/Landing";
import { Room } from "./components/Room";
import { SocketProvider } from "./providers/socket";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}

export default App;
