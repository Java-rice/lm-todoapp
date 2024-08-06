import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import goals from '../../assets/goals.png'
import todo from '../../assets/todo.png'
import accomplished from '../../assets/accomplished.png'
import "./Header.css";
import User from '../user/User';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav-logo">
          <span>Quick</span> ToDo
        </NavLink>
        <div className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}>
          {isMobile && isMenuOpen && <User className="user-mobile" />}
          <ul className="nav__list">
            <li className="nav__item first-nav">
              {isMobile && isMenuOpen && <img className="nav__icon" src={todo} alt="To Do" />}
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                onClick={handleMenuToggle}
              >
                To Do
              </NavLink>
            </li>
            <li className="nav__item">
              {isMobile && isMenuOpen && <img className="nav__icon" src={goals} alt="Goals" />}
              <NavLink 
                to="/goals" 
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                onClick={handleMenuToggle}
              >
                Long Term Goals
              </NavLink>
            </li>
            <li className="nav__item">
              {isMobile && isMenuOpen && <img className="nav__icon" src={accomplished} alt="Accomplished" />}
              <NavLink 
                to="/accomplished" 
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                onClick={handleMenuToggle}
              >
                Accomplished
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="icon-container">
        <a href="https://github.com/Java-rice/lm-todoapp.git" className="nav__github" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <div className="nav__toggle" onClick={handleMenuToggle}>
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
