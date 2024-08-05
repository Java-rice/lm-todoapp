import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import del from '../../assets/delete.png';
import edit from '../../assets/edit.png';
import './component.css';

const GoalCard = ({ goal, markAsDone, deleteGoal, editGoal }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(goal.description);
  const [editDeadline, setEditDeadline] = useState(goal.deadline);

  const handleEditGoal = () => {
    const updatedGoal = {
      ...goal,
      title: editTitle,
      description: editDescription,
      deadline: editDeadline
    };
    editGoal(updatedGoal);
    setShowEditModal(false);
  };

  return (
    <>
      <Card className="my-4" style={{ backgroundColor: '#FFA07A' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Check 
              type="checkbox"
              id={`goal-${goal.id}`}
              label={
                <span
                  className="h5 font-weight-bold"
                  style={{ textDecoration: goal.done ? "line-through" : "none" }}
                >
                  {goal.title}
                </span>
              }
              checked={goal.done}
              onChange={() => markAsDone(goal.id)}
            />
          </div>
          {goal.description && (
            <h6
              className="card-text mb-2"
              style={{ textDecoration: goal.done ? "line-through" : "none" }}
            >
              {goal.description}
            </h6>
          )}
          <div className="container-fluid d-flex flex-row justify-content-between">
            <Card.Text>
              <small className="text-muted">
                Created: {goal.createdAt}<br />
                Deadline: {goal.deadline}
              </small>
            </Card.Text>
            <div className="d-flex justify-content-end">
              <Button className="card-btn rounded me-2" onClick={() => deleteGoal(goal.id)}>
                <img src={del} alt="Delete" />
              </Button>
              <Button className="card-btn rounded me-2" onClick={() => setShowEditModal(true)}>
                <img src={edit} alt="Edit" />
              </Button>
            </div>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditGoal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoalCard;
