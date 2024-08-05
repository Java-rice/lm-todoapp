import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Badge } from 'react-bootstrap';
import del from '../../assets/delete.png';
import edit from '../../assets/edit.png';
import './component.css';

const AccomplishedCard = ({ task, onDelete }) => {
  return (
    <Card className="my-4" style={{ backgroundColor: '#E2DAD6' }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className={`h5 font-weight-bold ${task.done ? 'text-decoration-line-through' : ''}`}>
            {task.title}
          </span>
          {task.done && (
            <Badge bg="success" className="ms-2">
              Done
            </Badge>
          )}
        </div>
        {task.description && (
          <h6 className={`card-text mb-2 ${task.done ? 'text-decoration-line-through' : ''}`}>
            {task.description}
          </h6>
        )}
        <div className='container-fluid d-flex flex-row justify-content-between'>
          <Card.Text>
            <small className={`text-muted ${task.done ? 'text-decoration-line-through' : ''}`}>
              Created: {task.createdAt}<br />
              Deadline: {task.deadline}
            </small>
          </Card.Text>
          <div className="d-flex justify-content-end">
            <Button className="card-btn rounded me-2" onClick={() => onDelete(task.id)}>
              <img src={del} alt="Delete" />
            </Button>
            <Button className="card-btn rounded me-2">
              <img src={edit} alt="Edit" />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AccomplishedCard;
