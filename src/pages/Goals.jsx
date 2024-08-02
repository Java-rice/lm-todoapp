import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import add from "../assets/add.png";
import del from "../assets/delete.png";
import done from "../assets/done.png";
import GoalCard from "../components/GoalCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import './pages.css';

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState(""); // New state for description
  const [goalDeadline, setGoalDeadline] = useState(new Date());
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Fix Figma Issue",
      description: "Resolve the issue with the Figma design files.",
      createdAt: "7/31/2024 7:55 AM",
      deadline: "8/26/2024 8:00 PM",
    },
    {
      id: 2,
      title: "Complete React Project",
      description:
        "Finish building the React project with all required features.",
      createdAt: "7/15/2024 9:00 AM",
      deadline: "8/30/2024 5:00 PM",
    },
    {
      id: 3,
      title: "Prepare for Exam",
      description: "Study for the upcoming exams in September.",
      createdAt: "7/20/2024 11:30 AM",
      deadline: "9/10/2024 10:00 AM",
    },
    {
      id: 4,
      title: "Update Resume",
      description: "Update the resume with the latest projects and skills.",
      createdAt: "7/25/2024 2:45 PM",
      deadline: "8/15/2024 3:00 PM",
    },
  ]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSaveGoal = () => {
    const newGoal = {
      id: goals.length + 1,
      title: goalTitle,
      description: goalDescription,
      createdAt: format(new Date(), "M/d/yyyy h:mm a"),
      deadline: format(goalDeadline, "M/d/yyyy h:mm a"),
    };
    setGoals([...goals, newGoal]);
    setGoalTitle("");
    setGoalDescription(""); // Clear description
    setGoalDeadline(new Date());
    handleClose();
  };

  return (
    <div className="h-80">
      <div className="btn-container">
        <Button
          className="btn custom-btn orngebtn btn-sm rounded-pill"
          onClick={handleShow}
        >
          <img className="img" src={add} alt="Add Goal" />
          Add Goal
        </Button>
        <Button className="btn custom-btn orngebtn btn-sm rounded-pill">
          <img className="img" src={del} alt="Mark All Done" />
          Mark All Done
        </Button>
        <Button className="btn custom-btn vltbtn btn-sm rounded-pill">
          <img className="img" src={done} alt="Clear All" />
          Clear All
        </Button>
      </div>
      <div>
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      {/* Add Goal Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#F8FFFE" }}>
          <Form>
            <Form.Group controlId="goalTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter goal title"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="goalDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter goal description"
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="goalDeadline" className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <DatePicker
                selected={goalDeadline}
                onChange={(date) => setGoalDeadline(date)}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button
            variant="outline-light"
            size="sm"
            onClick={handleClose}
            style={{
              borderColor: "#5E1B89",
              color: "#5E1B89",
              marginRight: "10px",
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            style={{
              backgroundColor: "#5E1B89",
              borderColor: "#5E1B89",
              color: "white",
            }}
            onClick={handleSaveGoal}
          >
            Save Goal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Goals;
