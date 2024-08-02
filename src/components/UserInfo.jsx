import React, { useState, useEffect} from 'react';
import profile from './../assets/profilePic.png'
import './component.css';


const UserInfo = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    
    const updateTimeAndDate = () => {
      const now = new Date();
      const hours24 = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const date = now.toLocaleDateString();
      
      const hours12 = hours24 % 12 || 12;
      const ampm = hours24 >= 12 ? 'PM' : 'AM';
      const time = `${hours12.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

      setCurrentTime(time);
      setCurrentDate(date);
    };

    const intervalId = setInterval(updateTimeAndDate, 1000);
    updateTimeAndDate(); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="container-fluid user-container">
        <h1 className='fs-1 title taskname'>QuickTo-Do</h1>
        <div className="info">
          <div className="info-text">
            <h3 className='info-message fw-bolder'>John Mark Peroche</h3>
            <h4 className='info-message fw-bolder'>Time is Gold</h4>
            <p className="info-message">{currentTime}</p>
            <p className="info-message">{currentDate}</p>
          </div>
          <div className="profile-pic-container">
            <img src={profile} alt="Profile" className="profile-pic" />
          </div>
        </div>
    </div>
  )
}

export default UserInfo
