
import { useState } from 'react';
import './App.css';
import Invoice from './Invoice';

function App() {
  

  return (
    <>
      <h1 className='text-blue-500 text-center'>Invoice Generator</h1>
      <Invoice />
    </>
  );
}

export default App;