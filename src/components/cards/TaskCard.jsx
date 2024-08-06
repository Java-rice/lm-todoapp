import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import done from '../../assets/cdone.png';
import edit from '../../assets/cedit.png';
import del from '../../assets/cdelete.png';
import './component.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const TaskCard = ({ task, tasks, setTasks, goals }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editGoal, setEditGoal] = useState(task.goal);
  const [editStatus, setEditStatus] = useState(task.done);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUndoneConfirm, setShowUndoneConfirm] = useState(false);
  const [showDoneConfirm, setShowDoneConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToToggle, setTaskToToggle] = useState(null);

  // Check if the goal associated with this task is done
  const goalIsDone = goals.find(g => g.title === task.goal)?.done;

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowDeleteConfirm(false);
  };

  const handleEditTask = () => {
    const updatedTasks = tasks.map(t => 
      t.id === task.id 
      ? { ...t, title: editTitle, description: editDescription, deadline: editDeadline, goal: editGoal, done: editStatus }
      : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowEditModal(false);
  };

  const handleToggleDone = (id) => {
    setTaskToToggle(id);
    if (tasks.find(t => t.id === id).done) {
      setShowUndoneConfirm(true);
    } else {
      setShowDoneConfirm(true);
    }
  };

  const handleConfirmToggle = () => {
    const updatedTasks = tasks.map(t => 
      t.id === taskToToggle 
      ? { ...t, done: !t.done }
      : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowDoneConfirm(false);
    setShowUndoneConfirm(false);
  };

  // Function to determine if the task is overdue
  const isOverdue = new Date(task.deadline) < new Date() && !task.done;

  return (
    <>
      <Card className="my-4 px-2 card__container" style={{ backgroundColor: '#E2DAD6' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className={`h5 font-weight-bold title__width ${task.done ? 'text-decoration-line-through' : ''}`}>
              {task.title}
            </span>
            <div className="badge__container">
              <span className={`badge ${task.done ? 'bg-secondary': 'bg-info'}`}>
                {task.done ? "Done" : "Pending"}
              </span>
              <span className={`badge ${isOverdue ? 'bg-danger' : 'bg-success'}`}>
                {isOverdue ? "Overdue" : "Early"}
              </span>
            </div>
          </div>
          {task.goal && (
            <h6 className={`card-subtitle mb-2 text-muted ${goalIsDone ? 'text-decoration-line-through' : ''}`}>
              Goal: {task.goal}
            </h6>
          )}
          {task.description && (
            <p className={`card-text mb-2 ${task.done ? 'text-decoration-line-through' : ''}`}>
              <i>{task.description}</i>
            </p>
          )}
          <Card.Text>
            <small className={`text-muted ${task.done ? 'text-decoration-line-through' : ''}`}>
              Created: {formatDate(task.createdAt)}<br />
              Deadline: {formatDate(task.deadline)}
            </small>
          </Card.Text>
          <div className="d-flex button-div justify-content-start">
            <Button className="card-btn rounded me-2" onClick={() => handleToggleDone(task.id)}>
              <img src={done} alt="Done" />
            </Button>
            <Button className="card-btn rounded me-2" onClick={() => setShowEditModal(true)}>
              <img src={edit} alt="Edit" />
            </Button>
            <Button className="card-btn rounded me-2" onClick={() => { setTaskToDelete(task.id); setShowDeleteConfirm(true); }}>
              <img src={del} alt="Delete" />
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editDeadline" className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editGoal" className="mb-3">
              <Form.Label>Goal</Form.Label>
              <Form.Control
                as="select"
                value={editGoal}
                onChange={(e) => setEditGoal(e.target.value)}
              >
                <option value="">Select a goal</option>
                {goals.map((g) => (
                  <option key={g.id} value={g.title}>
                    {g.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value === 'true')}
              >
                <option value="false">Pending</option>
                <option value="true">Done</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleDeleteTask(taskToDelete)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Done Confirmation Modal */}
      <Modal show={showDoneConfirm} onHide={() => setShowDoneConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this task as done?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" onClick={() => setShowDoneConfirm(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmToggle}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Undone Confirmation Modal */}
      <Modal show={showUndoneConfirm} onHide={() => setShowUndoneConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this task as undone?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" onClick={() => setShowUndoneConfirm(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmToggle}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskCard;
