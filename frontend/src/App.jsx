import React, {useEffect, useState} from "react";

export default function App(){
  const [health, setHealth] = useState(null);
  useEffect(()=>{
    fetch('/api/health').then(r=>r.json()).then(setHealth).catch(e=>setHealth({error:e.message}));
  },[]);
  return (
    <div style={{fontFamily:'system-ui',padding:20}}>
      <h1>Enterprise Practice — Frontend</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
    </div>
  );
}
