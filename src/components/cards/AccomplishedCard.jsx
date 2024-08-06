import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal } from 'react-bootstrap';
import undone from '../../assets/undone.png';
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

const AccomplishedCard = ({ item, items, setItems, type }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUndoneConfirm, setShowUndoneConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToUndone, setItemToUndone] = useState(null);

  const handleShowConfirm = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      const updatedItems = items.filter(item => item.id !== itemToDelete);
      setItems(updatedItems);
      localStorage.setItem(type, JSON.stringify(updatedItems));
      handleCloseConfirm();
    }
  };

  const handleShowUndoneConfirm = (id) => {
    setItemToUndone(id);
    setShowUndoneConfirm(true);
  };

  const handleCloseUndoneConfirm = () => {
    setShowUndoneConfirm(false);
    setItemToUndone(null);
  };

  const handleConfirmUndone = () => {
    if (itemToUndone !== null) {
      const updatedItems = items.map(item =>
        item.id === itemToUndone ? { ...item, done: false } : item
      );

      setItems(updatedItems);
      localStorage.setItem(type, JSON.stringify(updatedItems));
      handleCloseUndoneConfirm();
    }
  };

  return (
    <div>
      <Card className="my-1 px-2 card__container" style={{ backgroundColor: '#E2DAD6' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className={`h5 font-weight-bold title__width ${item.done ? 'text-decoration-line-through' : ''}`}>
              {item.title}
            </span>
            <div className="badge__container">
              <span className="badge bg-secondary">{type === 'goals' ? 'Goal' : 'Done'}</span>
            </div>
          </div>
          {item.goal && type === 'goals' && (
            <h6 className={`card-subtitle mb-2 text-muted ${item.done ? 'text-decoration-line-through' : ''}`}>
              Goal: {item.goal}
            </h6>
          )}
          {item.description && (
            <p className={`card-text mb-2 ${item.done ? 'text-decoration-line-through' : ''}`}>
              {item.description}
            </p>
          )}
          <Card.Text>
            <small className={`text-muted ${item.done ? 'text-decoration-line-through' : ''}`}>
              Created: {formatDate(item.createdAt)}<br />
              Deadline: {formatDate(item.deadline)}
            </small>
          </Card.Text>
          <div className="d-flex accomplished-button-div justify-content-start">
            <Button className="card-btn rounded me-2" onClick={() => handleShowUndoneConfirm(item.id)}>
              <img src={undone} alt="Undone" />
            </Button>
            <Button className="card-btn rounded me-2" onClick={() => handleShowConfirm(item.id)}>
              <img src={del} alt="Delete" />
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {type === 'goals' ? 'goal' : 'task'}?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Undone Confirmation Modal */}
      <Modal show={showUndoneConfirm} onHide={handleCloseUndoneConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Undone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this goal as undone?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FF7F4D" }}>
          <Button variant="secondary" onClick={handleCloseUndoneConfirm}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmUndone}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccomplishedCard;
