import React from 'react';
import { NavLink } from "react-router-dom";
import './component.css';

const Navigation = () => {
  return (
    <div className='container-fluid nav-cont'>
      <ul className="nav-pills navg">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" end>
            To Do List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/goals">
            Long Term Goals
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/accomplished">
            Accomplished
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
