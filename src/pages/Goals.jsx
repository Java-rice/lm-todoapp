import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import add from "../assets/add.png";
import del from "../assets/delete.png";
import done from "../assets/done.png";
import GoalCard from "../components/cards/GoalCard";
import AccomplishedCard from "../components/cards/AccomplishedCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./pages.css";

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalDeadline, setGoalDeadline] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSaveGoal = () => {
    const newGoal = {
      id: goals.length + 1,
      title: goalTitle,
      description: goalDescription,
      createdAt: format(new Date(), "M/d/yyyy h:mm a"),
      deadline: format(goalDeadline, "M/d/yyyy h:mm a"),
      done: false,
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoalTitle("");
    setGoalDescription("");
    setGoalDeadline(new Date());
    handleClose();
  };

  const handleMarkAsDone = (id) => {
    const updatedGoals = goals.map((goal) => 
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const handleEditGoal = (updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const handleMarkAllDone = () => {
    const updatedGoals = goals.map((goal) => ({ ...goal, done: true }));
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const handleClearAll = () => {
    setGoals([]);
    localStorage.removeItem("goals");
  };

  const handleConfirm = (action) => {
    setConfirmAction(action);
    setShowConfirm(true);
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const handleConfirmProceed = () => {
    if (confirmAction === "markAllDone") handleMarkAllDone();
    if (confirmAction === "clearAll") handleClearAll();
    handleConfirmClose();
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
        <Button
          className="btn custom-btn orngebtn btn-sm rounded-pill"
          onClick={() => handleConfirm("markAllDone")}
        >
          <img className="img" src={done} alt="Mark All Done" />
          Mark All Done
        </Button>
        <Button
          className="btn custom-btn vltbtn btn-sm rounded-pill"
          onClick={() => handleConfirm("clearAll")}
        >
          <img className="img" src={del} alt="Clear All" />
          Clear All
        </Button>
      </div>
      <div>
        {goals
          .filter((goal) => !goal.done)
          .map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              markAsDone={handleMarkAsDone}
              deleteGoal={handleDeleteGoal}
              editGoal={handleEditGoal}
            />
          ))}
      </div>
      <div>
        {goals
          .filter((goal) => goal.done)
          .map((goal) => (
            <AccomplishedCard
              key={goal.id}
              task={goal}
            />
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
      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleConfirmClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {confirmAction === "markAllDone" ? "mark all goals as done" : "clear all goals"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmProceed}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Goals;
