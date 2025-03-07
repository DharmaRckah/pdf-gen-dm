
import { useState } from 'react';
import './App.css';

import Bill from './components/Bill';

function App() {
  

  return (
    <>
      <h1 className='text-blue-500 text-center'>Invoice Generator</h1>
      <Bill />
    </>
  );
}

export default App;