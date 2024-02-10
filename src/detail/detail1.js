import React, { useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState('');
  
  const sendDataToFlask = (buttonName) => {
    const payload = {
      buttonName: buttonName,
    };

    fetch('http://localhost:5006/send-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Response from Flask:', result);
      })
      .catch(error => {
        console.error('Error sending data to Flask:', error);
      });
  
  };

  return (
    <div>
      <button onClick={sendDataToFlask}>Send Data to Flask</button>
    </div>
  );
};

export default MyComponent;

