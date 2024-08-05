import React, { useState, useEffect, useRef } from 'react';
import profile from '../../assets/profilePic.png';
import { quotes } from './quote';
import './User.css';

const User = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || profile);
  const [name, setName] = useState(localStorage.getItem('name') || 'Enter your Name');
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const date = new Date();
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  const quoteOfTheDay = quotes[dayOfYear % quotes.length];

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameSubmit = () => {
    localStorage.setItem('name', name);
    setIsEditingName(false); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  return (
    <div className="container-fluid user__cont">
      <div className="info-cont">
        <div className="profile-pic-container" onClick={() => fileInputRef.current.click()}>
          <img src={profileImage} alt="Profile" className="profile-pic" />
        </div>
        <input
          type="file"
          ref={fileInputRef} // Attach the ref to the file input
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="info-text">
          {isEditingName ? (
            <div className="name-input-container">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="name-input"
                onBlur={handleNameSubmit}
                onKeyPress={handleKeyPress} 
                autoFocus
              />
            </div>
          ) : (
            <h3 className="info-message fw-bolder" onClick={() => setIsEditingName(true)}>
              {name}
            </h3>
          )}
          <p className="info-message fw-bolder">"<i>{quoteOfTheDay}</i>"</p>
          <p className="info-message">{currentTime}</p>
          <p className="info-message">{currentDate}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
