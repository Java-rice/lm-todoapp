import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import add from "../assets/add.png";
import del from "../assets/delete.png";
import done from "../assets/done.png";
import TaskCard from "../components/TaskCard";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./pages.css";

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState(""); // New state for description
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [isLongTerm, setIsLongTerm] = useState(false);
  const [longTermGoal, setLongTermGoal] = useState("");
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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

  const handleSaveTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      description: taskDescription,
      createdAt: format(new Date(), "M/d/yyyy h:mm a"),
      deadline: format(taskDeadline, "M/d/yyyy h:mm a"),
      isLongTerm: isLongTerm,
      longTermGoal: longTermGoal,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription(""); // Clear description
    setTaskDeadline(new Date());
    setIsLongTerm(false);
    setLongTermGoal("");
    handleClose();
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
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {/* Add Task Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered // Center the modal vertically
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
            <Form.Group controlId="isLongTerm" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is this a long-term goal?"
                checked={isLongTerm}
                onChange={(e) => setIsLongTerm(e.target.checked)}
              />
            </Form.Group>
            {isLongTerm && (
              <Form.Group controlId="longTermGoal" className="mb-3">
                <Form.Label>Long-Term Goal</Form.Label>
                <Form.Control
                  as="select"
                  value={longTermGoal}
                  onChange={(e) => setLongTermGoal(e.target.value)}
                >
                  <option value="">Select a goal</option>
                  <option value="Career Development">Career Development</option>
                  <option value="Health and Fitness">Health and Fitness</option>
                  <option value="Personal Growth">Personal Growth</option>
                  <option value="Financial Stability">
                    Financial Stability
                  </option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            )}
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
            onClick={handleSaveTask} // Save the task
          >
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Task;
