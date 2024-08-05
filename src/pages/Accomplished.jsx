import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import done from "../assets/done.png";
import AccomplishedCard from "../components/cards/AccomplishedCard";
import "./pages.css";

const Accomplished = () => {
  const [tasks, setTasks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const accomplishedGoals = storedGoals.filter((goal) => goal.done);
    setTasks(accomplishedGoals);
  }, []);

  const handleDeleteAll = () => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const updatedGoals = storedGoals.filter((goal) => !goal.done);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setTasks([]);
  };

  const handleConfirm = () => setShowConfirm(true);
  const handleClose = () => setShowConfirm(false);
  const handleConfirmProceed = () => {
    handleDeleteAll();
    handleClose();
  };

  return (
    <div className="h-80">
      <div className="title-bar container-fluid">
        <h3 className="">Accomplished Tasks</h3>
      </div>
      <div className="btn-container">
        <Button
          className="btn custom-btn btn-sm rounded"
          onClick={handleConfirm}
        >
          <img className="img" src={done} alt="Delete All" />
          Delete All
        </Button>
      </div>
      <div>
        {tasks.map((task) => (
          <AccomplishedCard key={task.id} task={task} />
        ))}
      </div>
      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete all accomplished goals?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default Accomplished;
