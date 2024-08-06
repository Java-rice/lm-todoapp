import React, { useState, useEffect } from "react";
import AccomplishedCard from "../components/cards/AccomplishedCard";
import { Button, Modal } from "react-bootstrap";
import del from "../assets/delete.png"; // Assuming you have this icon
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.css";

const Accomplished = () => {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setTasks(storedTasks);
    setGoals(storedGoals);
  }, []);

  // Filter done tasks and goals
  const accomplishedTasks = tasks.filter(task => task.done);
  const accomplishedGoals = goals.filter(goal => goal.done);

  const handleClearAll = () => {
    setTasks([]);
    setGoals([]);
    localStorage.removeItem("tasks");
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
    if (confirmAction === "clearAll") handleClearAll();
    handleConfirmClose();
  };

  return (
    <div className="h-80">
      <div className="title-bar container-fluid">
        <h3>Accomplished Tasks & Goals</h3>
      </div>
      <div className="btn-container">
        <Button
          className="btn custom-btn btn-sm rounded"
          onClick={() => handleConfirm("clearAll")}
        >
          <img className="img" src={del} alt="Clear All" />
          Clear All
        </Button>
      </div>
      <div>
        {accomplishedTasks.length === 0 && accomplishedGoals.length === 0 ? (
          <p>No tasks or goals accomplished yet.</p>
        ) : (
          <>
            {accomplishedTasks.length > 0 && (
              <>
                <h4 className="mt-3 text-center font-weight-bold">Accomplished Tasks</h4>
                {accomplishedTasks.map(task => (
                  <AccomplishedCard
                    key={task.id}
                    item={task}
                    type="tasks"
                    items={tasks}
                    setItems={setTasks}
                  />
                ))}
              </>
            )}
            {accomplishedGoals.length > 0 && (
              <>
                <h4 className="mt-3 text-center font-weight-bold">Accomplished Goals</h4>
                {accomplishedGoals.map(goal => (
                  <AccomplishedCard
                    key={goal.id}
                    item={goal}
                    type="goals"
                    items={goals}
                    setItems={setGoals}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleConfirmClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to clear all accomplished tasks and goals?
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

export default Accomplished;
