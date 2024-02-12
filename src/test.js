import React, { useState, useEffect } from 'react';
import './app2.css';


const CardComponent = ({ course }) => {
  const [showMore, setShowMore] = useState(false);

  if (!course || Object.keys(course).length === 0) {
    return <p>No course data available</p>;
  }

  const cleanLink = course.Link?.startsWith('http') ? course.Link : `http://${course.Link}`;

  return (
    <div className="centered-card">
    <div className="card" style={{color:"rgba(35,31,32,0.8)"}}>
      <div className="card-content">
      <h2 className={showMore ? 'show-more' : ''}>{course['Course Title']}</h2>
        <p>Rating: {course.Rating}</p>
        <p>Reviews: {course.Reviews}</p>
        <p>Skill Outcome: {course['Skill Outcome']}</p>
        {showMore && (
          <div>
            {/* Additional information to show when "Show More" is clicked */}
            <p>Organization: {course.Organization}</p>
            <p>Level: {course.Level}</p>
            <p>Learning Period: {course['Learning Period']}</p>
            {/* Add more fields as needed */}
          </div>
        )}
        <a href={cleanLink} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      </div>
      <div className="show-more-button">
        <button
          className="icon-button"
          onClick={() => setShowMore(!showMore)}
          aria-label={showMore ? 'Show Less' : 'Show More'}
        >
          {showMore ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path d="M1.646 10.354a.5.5 0 0 1 .708 0L8 4.707l5.646 5.647a.5.5 0 0 1-.708.708L8 5.707 2.354 11.354a.5.5 0 0 1-.708 0z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          )}
        </button>
      </div>
    </div>
    </div>
  );
};


  
  // CardComponent component remains unchanged...

export const processDataFromApp = (buttonName) => {
  console.log('Received button name from App:', buttonName);
  return buttonName;
};

const CardListComponent = ({ courses, level }) => {
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  if (!courses || courses.length === 0) {
    return <p>No courses available</p>;
  }

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const deltaX = endX - startX;

    if (deltaX > 50) {
      // Swipe right, go to the previous card
      setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? courses.length - 1 : prevIndex - 1));
    } else if (deltaX < -50) {
      // Swipe left, go to the next card
      setCurrentCardIndex((prevIndex) => (prevIndex === courses.length - 1 ? 0 : prevIndex + 1));
    }
  };

  return (
    <div className="card-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="card-center-container">
        <h1 style={{color:"rgba(35,31,32,0.8)"}}>{level} Courses</h1>
        <div className="card-list">
          {courses.map((course, index) => (
            <CardComponent key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};



const TableToCardComponent = () => {
  const [beginnerCourses, setBeginnerCourses] = useState([]);
  const [intermediateCourses, setIntermediateCourses] = useState([]);
  const [advancedCourses, setAdvancedCourses] = useState([]);
  const [clickedButton, setClickedButton] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://34.87.53.165:5009/for');
        if (response.ok) {
          const responseData = await response.json();
          console.log('Fetched data:', responseData);

          if (responseData.data) {
            const parsedData = JSON.parse(responseData.data);
            if (Array.isArray(parsedData)) {
              const beginner = parsedData.slice(0, 3);
              const intermediate = parsedData.slice(3, 6);
              const advanced = parsedData.slice(6, 9);
              setBeginnerCourses(beginner);
              setIntermediateCourses(intermediate);
              setAdvancedCourses(advanced);
              processDataFromApp(clickedButton);
            } else {
              throw new Error('Parsed data is not in the expected array format');
            }
          } else {
            throw new Error('Data property not found in the response');
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors (e.g., display an error message)
      }
    };

    fetchData();
  }, [clickedButton]);

  return (
    <html data-theme="cupcake">
    <div>
    
      <h1 style={{color:"rgba(35,31,32,0.8)",fontSize: "300"}}>Computer engineering</h1>
      
      <a href="/choosing">
        <button>back to choosing</button>
      </a>
      
      <div>
        <CardListComponent courses={beginnerCourses} level="Beginner" />
      </div>
      <br />
      <div>
        <CardListComponent courses={intermediateCourses} level="Intermediate" />
      </div>
      <br />
      <div>
        <CardListComponent courses={advancedCourses} level="Advanced" />
      </div>
      <br />
      
    </div>
    </html>
  );
};

export default TableToCardComponent;
