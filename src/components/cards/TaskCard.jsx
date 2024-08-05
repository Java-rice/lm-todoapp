import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import del from '../../assets/delete.png';
import edit from '../../assets/edit.png';
import './component.css';

const TaskCard = ({ task, tasks, setTasks, goals }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editGoal, setEditGoal] = useState(task.goal);

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = () => {
    const updatedTasks = tasks.map(t => 
      t.id === task.id 
      ? { ...t, title: editTitle, description: editDescription, deadline: editDeadline, goal: editGoal }
      : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowEditModal(false);
  };

  const handleToggleDone = (id) => {
    const updatedTasks = tasks.map(t => 
      t.id === id 
      ? { ...t, done: !t.done }
      : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Card className="my-4" style={{ backgroundColor: '#FFA07A' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Check 
              type="checkbox"
              id={`task-${task.id}`}
              label={<span className="h5 font-weight-bold">{task.title}</span>}
              checked={task.done}
              onChange={() => handleToggleDone(task.id)}
            />
          </div>
          {task.goal && (
            <h6 className="card-subtitle mb-2 text-muted">Goal: {task.goal}</h6>
          )}
          {task.description && (
            <h6 className="card-text mb-2 ">{task.description}</h6>
          )}
          <div className='container-fluid d-flex flex-row justify-content-between'>
            <Card.Text>
              <small className='text-muted'>
                Created: {task.createdAt}<br />
                Deadline: {task.deadline}
              </small>
            </Card.Text>
            <div className="d-flex justify-content-end">
              <Button className="card-btn rounded me-2" onClick={() => handleDeleteTask(task.id)}>
                <img src={del} alt="Delete" />
              </Button>
              <Button className="card-btn rounded me-2" onClick={() => setShowEditModal(true)}>
                <img src={edit} alt="Edit" />
              </Button>
            </div>
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
    </>
  );
};

export default TaskCard;
