import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import done from "../assets/done.png";
import AccomplishedCard from "../components/cards/AccomplishedCard";
import "./pages.css";

// Define constant for local storage key
const ACCOMPLISHED_TASKS_KEY = "accomplishedTasks";

// Custom hook for local storage operations
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key", key, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key", key, error);
    }
  };

  return [storedValue, setValue];
};

const Accomplished = () => {
  const [tasks, setTasks] = useLocalStorage(ACCOMPLISHED_TASKS_KEY, []);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAll = () => {
    localStorage.removeItem(ACCOMPLISHED_TASKS_KEY);
    setTasks([]);
  };

  const handleConfirm = () => setShowConfirm(true);
  const handleClose = () => setShowConfirm(false);
  const handleConfirmProceed = () => {
    handleDeleteAll();
    handleClose();
  };

  const handleDeleteTask = (id) => {
    const updatedAccomplishedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedAccomplishedTasks);
  };

  return (
    <div className="h-80">
      <div className="title-bar container-fluid">
        <h3 className="">Accomplished Tasks</h3>
      </div>
      <div className="btn-container">
        <Button className="btn custom-btn btn-sm rounded" onClick={handleConfirm}>
          <img className="img" src={done} alt="Delete All" />
          Delete All
        </Button>
      </div>
      <div>
        {tasks.map((task) => (
          <AccomplishedCard key={task.id} task={task} onDelete={handleDeleteTask} />
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
