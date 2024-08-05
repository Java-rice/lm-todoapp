import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import add from "../assets/add.png";
import del from "../assets/delete.png";
import done from "../assets/done.png";
import TaskCard from "../components/cards/TaskCard";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./pages.css";

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSaveTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      description: taskDescription,
      createdAt: format(new Date(), "M/d/yyyy h:mm a"),
      deadline: format(taskDeadline, "M/d/yyyy h:mm a"),
      goal: goal,
      done: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline(new Date());
    setGoal("");
    handleClose();
  };

  const handleMarkAllDone = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, done: true }));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleClearAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
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
          <img className="img" src={add} alt="Add Task" />
          Add Task
        </Button>
        <Button
          className="btn custom-btn orngebtn btn-sm rounded-pill"
          onClick={() => handleConfirm("markAllDone")}
        >
          <img className="img" src={del} alt="Mark All Done" />
          Mark All Done
        </Button>
        <Button
          className="btn custom-btn vltbtn btn-sm rounded-pill"
          onClick={() => handleConfirm("clearAll")}
        >
          <img className="img" src={done} alt="Clear All" />
          Clear All
        </Button>
      </div>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            goals={goals}
          />
        ))}
      </div>
      {/* Add Task Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#F8FFFE" }}>
          <Form>
            <Form.Group controlId="taskTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="taskDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="taskDeadline" className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <DatePicker
                selected={taskDeadline}
                onChange={(date) => setTaskDeadline(date)}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="goal" className="mb-3">
              <Form.Label>Goal</Form.Label>
              <Form.Control
                as="select"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="">Select a goal</option>
                {goals.map((g) => (
                  <option key={g.id} value={g.title}>
                    {g.title}
                  </option>
                ))}
              </Form.Control>
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
            onClick={handleSaveTask}
          >
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleConfirmClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {confirmAction === "markAllDone" ? "mark all tasks as done" : "clear all tasks"}?
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

export default Task;
