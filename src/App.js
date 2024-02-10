import React, { useState } from 'react';
import './App.css';

const CustomCardComponent = ({ channel }) => {
  const [showMore, setShowMore] = useState(false);

  if (!channel || Object.keys(channel).length === 0) {
    return <p>No channel data available</p>;
  }

  return (
    <div className="custom-card">
      <div className="custom-card-content">
        <h2>{channel.name}</h2>
        <img src={channel.img} alt={`Image for ${channel.name}`} className="custom-card-image" />
        <p>{channel.des}</p>
        {showMore && (
          <div>
            {/* Additional information to show when "Show More" is clicked */}
            {/* You can add more details here as needed */}
          </div>
        )}
        <a href="/choosing/details">
          <button>Learn More</button>
        </a>
      </div>
      <div className="show-more-button">
        <button
          className="icon-button"
          onClick={() => setShowMore(!showMore)}
          aria-label={showMore ? 'Show Less' : 'Show More'}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default CustomCardComponent;
