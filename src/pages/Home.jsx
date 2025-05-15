import React, { useRef, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Background from '../components/Background';
import Foreground from '../components/Foreground';

function Home() {
  const constraintsRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-800 text-white overflow-hidden">
      <div 
        ref={constraintsRef} 
        className="fixed inset-0 w-screen h-screen pointer-events-none"
      />
      <NavBar />
      <Background />
      <div className="relative z-10">
        {mounted && <Foreground reference={constraintsRef} />}
      </div>
    </div>
  );
}

export default Home;
