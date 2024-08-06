import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import add from "../assets/add.png";
import del from "../assets/delete.png";
import done from "../assets/done.png";
import GoalCard from "../components/cards/GoalCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./pages.css";

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalDeadline, setGoalDeadline] = useState(new Date());
  const [goalStatus, setGoalStatus] = useState("Pending");
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
      status: goalStatus,
      done: goalStatus === "Done",
      origin: "goals",
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoalTitle("");
    setGoalDescription("");
    setGoalDeadline(new Date());
    setGoalStatus("Pending");
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
      <div className="title-bar container-fluid">
        <h3 className="">Goals</h3>
      </div>
      <div className="btn-container">
        <Button
          className="btn custom-btn btn-sm rounded"
          onClick={handleShow}
        >
          <img className="img" src={add} alt="Add Goal" />
          Add Goal
        </Button>
        <Button
          className="btn custom-btn btn-sm rounded"
          onClick={() => handleConfirm("markAllDone")}
        >
          <img className="img" src={done} alt="Mark All Done" />
          All Done
        </Button>
        <Button
          className="btn custom-btn btn-sm rounded"
          onClick={() => handleConfirm("clearAll")}
        >
          <img className="img" src={del} alt="Clear All" />
          Clear All
        </Button>
      </div>
      <div>
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            goals={goals}
            setGoals={setGoals}
            handleMarkAsDone={handleMarkAsDone}
            handleDeleteGoal={handleDeleteGoal}
            handleEditGoal={handleEditGoal}
          />
        ))}
      </div>

      {/* Modal for Adding Goal */}
      <Modal show={showModal} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Goal</Modal.Title>
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
            <Form.Group controlId="goalStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={goalStatus}
                onChange={(e) => setGoalStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveGoal}>
            Save Goal
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Modal */}
      <Modal show={showConfirm} onHide={handleConfirmClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmAction === "markAllDone" && (
            <p>Are you sure you want to mark all goals as done?</p>
          )}
          {confirmAction === "clearAll" && (
            <p>Are you sure you want to clear all goals?</p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" onClick={handleConfirmClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmProceed}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Goals;
