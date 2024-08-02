import React, { useState } from "react";
import { Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import done from "../assets/done.png";
import AccomplishedCard from '../components/AccomplishedCard';
import './pages.css'

const Accomplished = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Fix Figma Issue",
      description: "Resolve the issue with the Figma design files.",
      createdAt: "7/31/2024 7:55 AM",
      deadline: "8/26/2024 8:00 PM",
      isLongTerm: false,
      longTermGoal: "",
    },
    {
      id: 2,
      title: "Complete React Project",
      description:
        "Finish building the React project with all required features.",
      createdAt: "7/15/2024 9:00 AM",
      deadline: "8/30/2024 5:00 PM",
      isLongTerm: true,
      longTermGoal: "Build a fully functional app",
    },
    {
      id: 3,
      title: "Prepare for Exam",
      description: "Study for the upcoming exams in September.",
      createdAt: "7/20/2024 11:30 AM",
      deadline: "9/10/2024 10:00 AM",
      isLongTerm: false,
      longTermGoal: "",
    },
    {
      id: 4,
      title: "Update Resume",
      description: "Update the resume with the latest projects and skills.",
      createdAt: "7/25/2024 2:45 PM",
      deadline: "8/15/2024 3:00 PM",
      isLongTerm: false,
      longTermGoal: "",
    },
  ]);

  return (
    <div className="h-80">
      <div className="btn-container">
        <Button className="btn custom-btn vltbtn btn-sm rounded-pill">
          <img className="img" src={done} alt="Delete All" />
          Delete All
        </Button>
      </div>
      <div>
        {tasks.map((task) => (
          <AccomplishedCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Accomplished
