import React, { useState, useEffect } from 'react';
import './App.css';
import { processDataFromApp } from './test';

const channelsData = [
  { id: 1, name: 'Computer Engineering', img: 'https://webassets.kctcs.edu/images/global/education-training/computer-engineering-technology.jpg', des: 'Combining computer science and electrical engineering to create efficient systems.Professionals work on hardware, software, networking, cybersecurity, and emerging tech like AI and robotics.' },
  { id: 2, name: 'Hardware and Embedded Systems', img: 'https://www.pct.edu/sites/default/files/styles/original/public/2021-02/elecAAS.jpg?itok=74hyvGpS', des: 'Hardware:Physical components of a computer; tangible parts like CPU, memory, and peripherals.Embedded Systems:Specialized computing systems in devices; optimized for specific tasks like in appliances or automobiles.' },
  { id: 3, name: 'Database Systems and Data', img: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3uKiGvN5pjbtwlTWEhugzt/f57b790f9aefcc130786a710e4fa276d/GettyImages-1338373232.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000&h=', des: ' Database Systems:Software that organizes, stores, and retrieves data systematically. It includes a database engine and query language for efficient data management.Data:Raw facts or information, in various forms like numbers, text, or images. Organized in databases for structured storage and retrieval.' },
  { id: 4, name: 'Networks and Information Security', img: 'https://www.sacredheart.edu/media/shu-media/school-of-computer-science-amp-engineering/computer-engineering/computer_engineering_003_1220x686.jpg', des: 'Networks:Interconnected computers sharing information.Information Security:Protecting digital data from unauthorized access or modification.' },
  { id: 5, name: 'Information Systems and Software Engineering', img: 'https://www.cse.uconn.edu/wp-content/uploads/2019/11/engineering180220a024.jpg', des: 'Networks:Interconnected computers sharing information.Information Security:Protecting digital data from unauthorized access or modification.' },
  { id: 6, name: 'Computational Intelligence and Computer Vision', img: 'https://www.clarkson.edu/sites/default/files/2023-06/Electrical-Computer-Engineering-PHD-Hero-1600x900.jpg', des: 'Computational Intelligence:Algorithms inspired by natural intelligence.Computer Vision:Machines interpreting visual data for recognition and decision-making.' },
  { id: 7, name: 'Theory of Computation and Quantum Computing', img: 'https://images.shiksha.com/mediadata/images/articles/1676518993phpJtauhM.jpeg', des: 'Theory of Computation:Study of algorithms and computational problems.Quantum Computing:Uses quantum mechanics for faster information processing.' },
  // Add more channel objects as needed
];
const ChannelCard = ({ channel, onClick }) => (
  <div className="card">
    <h1>{channel.name}</h1>
    <img src={channel.img} alt={`Image ${channel.id}`} className="small-image" />
    <p>{channel.des}</p>
    <a href="/choosing/details">
      <button onClick={() => onClick(channel.name)}>Learn More</button>
      </a>
  </div>
);

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nearestChannel, setNearestChannel] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    // Set the scroll position to show the first card on page load
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
      cardContainer.scrollLeft = 0;
    }
  }, []);

  const sendDataToFlask = (buttonName) => {
    const payload = { buttonName };

    fetch('http://localhost:5009/receive-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Response from Flask:', result);
        processDataFromApp(buttonName);
      })
      .catch(error => {
        console.error('Error sending data to Flask:', error);
      });
  };

  const handleSearch = () => {
    if (searchQuery) {
      const foundChannel = channelsData.find(
        (channel) =>
          channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setNearestChannel(foundChannel);
    }
  };

  const handleSlide = (direction) => {
    const lastIndex = channelsData.length - 1;

    if (direction === 'left') {
      setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? lastIndex : prevIndex - 1));
    } else if (direction === 'right') {
      setCurrentCardIndex((prevIndex) => (prevIndex === lastIndex ? 0 : prevIndex + 1));
    }
  };

  const currentChannel = channelsData[currentCardIndex];

  return (
    <div className="App">
      <div className="left-corner">
        <h1>เลือกสายงานที่ต้องการดู</h1>
        <input
          type="text"
          placeholder="ค้นหาสายงานอื่น"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {nearestChannel && (
          <div>
            <h2>Nearest branch:</h2>
            <p>Name: {nearestChannel.name}</p>
            <a href="/choosing/details">
              <button onClick={() => sendDataToFlask(nearestChannel.name)}>Learn More</button>
            </a>
          </div>
        )}
        <h1>สายงานยอดฮิต</h1>
      </div>

      <div >
        <div className="card-right-container">
          {channelsData.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} onClick={() => sendDataToFlask(channel.name)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;