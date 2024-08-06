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

const GoalCard = ({ goal, goals, setGoals }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUndoneConfirm, setShowUndoneConfirm] = useState(false);
  const [showDoneConfirm, setShowDoneConfirm] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(goal.description);
  const [editDeadline, setEditDeadline] = useState(goal.deadline);
  const [editStatus, setEditStatus] = useState(goal.done);

  const handleDeleteGoal = () => {
    const updatedGoals = goals.filter(g => g.id !== goal.id);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setShowDeleteConfirm(false);
  };

  const handleEditGoal = () => {
    const updatedGoals = goals.map(g => 
      g.id === goal.id 
      ? { ...g, title: editTitle, description: editDescription, deadline: editDeadline, done: editStatus }
      : g
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setShowEditModal(false);
  };

  const handleToggleDone = () => {
    if (goal.done) {
      setShowUndoneConfirm(true);
    } else {
      setShowDoneConfirm(true);
    }
  };

  const handleConfirmUndone = () => {
    const updatedGoals = goals.map(g => 
      g.id === goal.id 
      ? { ...g, done: !g.done }
      : g
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setShowUndoneConfirm(false);
  };

  const handleConfirmDone = () => {
    const updatedGoals = goals.map(g => 
      g.id === goal.id 
      ? { ...g, done: !g.done }
      : g
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setShowDoneConfirm(false);
  };

  // Function to determine if the goal is overdue
  const isOverdue = new Date(goal.deadline) < new Date() && !goal.done;

  return (
    <>
      <Card className="my-4 px-2 card__container" style={{ backgroundColor: '#E2DAD6' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className={`h5 font-weight-bold title__width ${goal.done ? 'text-decoration-line-through' : ''}`}>
              {goal.title}
            </span>
            <div className="badge__container">
              <span className={`badge ${goal.done ? 'bg-secondary' : 'bg-info'}`}>
                {goal.done ? "Done" : "Pending"}
              </span>
              <span className={`badge ${isOverdue ? 'bg-danger' : 'bg-success'}`}>
                {isOverdue ? "Overdue" : "Early"}
              </span>
            </div>
          </div>
          {goal.description && (
            <p className={`card-text mb-2 ${goal.done ? 'text-decoration-line-through' : ''}`}>
              <i>{goal.description}</i>
            </p>
          )}
          <Card.Text>
            <small className={`text-muted ${goal.done ? 'text-decoration-line-through' : ''}`}>
              Created: {formatDate(goal.createdAt)}<br />
              Deadline: {formatDate(goal.deadline)}
            </small>
          </Card.Text>
          <div className="d-flex button-div justify-content-start">
            <Button className="card-btn rounded me-2" onClick={handleToggleDone}>
              <img src={done} alt="Done" />
            </Button>
            <Button className="card-btn rounded me-2" onClick={() => setShowEditModal(true)}>
              <img src={edit} alt="Edit" />
            </Button>
            <Button className="card-btn rounded me-2" onClick={() => setShowDeleteConfirm(true)}>
              <img src={del} alt="Delete" />
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Goal Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter goal title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter goal description"
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
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" className='modal__button' onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" className='modal__button' onClick={handleEditGoal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this goal?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" className='modal__button' onClick={() => setShowDeleteConfirm(false)}>
            No
          </Button>
          <Button variant="primary" className='modal__button' onClick={handleDeleteGoal}>
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
          Are you sure you want to mark this goal as done?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" className='modal__button' onClick={() => setShowDoneConfirm(false)}>
            No
          </Button>
          <Button variant="primary" className='modal__button' onClick={handleConfirmDone}>
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
          Are you sure you want to mark this goal as not done?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" className='modal__button' onClick={() => setShowUndoneConfirm(false)}>
            No
          </Button>
          <Button variant="primary" className='modal__button' onClick={handleConfirmUndone}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoalCard;
