import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import done from '../../assets/cdone.png';
import edit from '../../assets/cedit.png';
import del from '../../assets/cdelete.png';
import './component.css';

const GoalCard = ({ goal, markAsDone, deleteGoal, editGoal }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(goal.description);
  const [editDeadline, setEditDeadline] = useState(goal.deadline);
  const [editStatus, setEditStatus] = useState(goal.done);

  const handleEditGoal = () => {
    const updatedGoal = {
      ...goal,
      title: editTitle,
      description: editDescription,
      deadline: editDeadline,
      done: editStatus
    };
    editGoal(updatedGoal);
    setShowEditModal(false);
  };

  return (
    <>
      <Card className="my-4" style={{ backgroundColor: '#FFA07A' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span
              className={`h5 font-weight-bold ${goal.done ? 'text-decoration-line-through' : ''}`}
            >
              {goal.title}
            </span>
            <span className={`badge ${goal.done ? 'bg-success' : 'bg-secondary'}`}>
              {goal.done ? 'Done' : 'Pending'}
            </span>
          </div>
          {goal.description && (
            <h6
              className={`card-text mb-2 ${goal.done ? 'text-decoration-line-through' : ''}`}
            >
              {goal.description}
            </h6>
          )}
          <div className="container-fluid d-flex flex-row justify-content-between">
            <Card.Text>
              <small className={`text-muted ${goal.done ? 'text-decoration-line-through' : ''}`}>
                Created: {goal.createdAt}<br />
                Deadline: {goal.deadline}
              </small>
            </Card.Text>
            <div className="d-flex justify-content-end">
            <Button className="card-btn rounded me-2" onClick={() => handleToggleDone(task.id)}>
                <img src={done} alt="Done" />
              </Button>
              <Button className="card-btn rounded me-2" onClick={() => setShowEditModal(true)}>
                <img src={edit} alt="Edit" />
              </Button>
              <Button className="card-btn rounded me-2" onClick={() => handleDeleteTask(task.id)}>
                <img src={del} alt="Delete" />
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
          <Button variant="primary" onClick={handleEditGoal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoalCard;
