import React from "react";
import Foreground from "./components/Foreground";
import Background from "./components/background";

function App() {
  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <Background />
      <Foreground />
    </div>
  );
}

export default App;
