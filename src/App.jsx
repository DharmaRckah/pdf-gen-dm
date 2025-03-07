// src/App.js
import { useState } from 'react';
import './App.css';
import Invoice from './Invoice';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className='text-blue-500 text-center'>Invoice Generator</h1>
      <Invoice />
    </>
  );
}

export default App;