import React from 'react';
import './App.css';
import Header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function App() {
  
  let navigate = useNavigate(); 
  const routeChange = (path: string) =>{ 
    navigate(path);
  }

  return (
    <Container>
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Welcome!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Welcome to the helpdesk. Click a button below to begin.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={() => routeChange('create')}>Create Ticket</Button>
          <Button type="button" className="btn btn-primary btn-lg px-4" onClick={() => routeChange('admin')}>Admin Console</Button>
        </div>
      </div>
    </div>
    </Container>
  );
}

export default App;
