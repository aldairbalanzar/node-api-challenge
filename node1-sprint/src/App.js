import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getState = () => {
      axios
        .get('http://localhost:5000')
        .then(res => {
          setState(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getState();
  }, []);

  console.log('line: 19: ', state);

  return (
    <div className="App">
      <h2>{state.api}</h2>
      <p>{state.message}</p>
    </div>
  );
}

export default App;
