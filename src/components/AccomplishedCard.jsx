import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form } from 'react-bootstrap';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import './component.css';
import { Button } from 'react-bootstrap';

const AccomplishedCard = ({task}) => {
  return (
    <Card className="my-4" style={{ backgroundColor: '#FFA07A' }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Form.Check 
            type="checkbox"
            id={`task-${task.id}`}
            label={<span className="h5 font-weight-bold">{task.title}</span>}
          />
        </div>
        {task.isLongTerm && task.longTermGoal && (
            <h6 class="card-subtitle mb-2 text-muted">Long-Term Goal: {task.longTermGoal}</h6>
        )}
        {task.description && (
            <h6 class="card-text mb-2 ">{task.description}</h6>
        )}
        <div className='container-fluid d-flex flex-row justify-content-between'>
            <Card.Text>
            <small className='text-muted'>
                Created: {task.createdAt}<br />
                Deadline: {task.deadline}
            </small>
            </Card.Text>
            <div className="d-flex justify-content-end">
            <Button className="card-btn rounded me-2">
                <img src={del} alt="Mark Done" />
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

export default AccomplishedCard
