import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LocalizedText from './languages/en.json';

function App() {

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  }

  return (
    <Container>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">{LocalizedText.mainPage_title}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">{LocalizedText.mainPage_text}</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button type="button"  style={{ backgroundColor: '#5D3FD3', borderColor:'#5D3FD3' }} className="btn btn-lg px-4 gap-3" onClick={() => routeChange('create')}>{LocalizedText.createTicket}</Button>
            <Button type="button" style={{ backgroundColor: '#5D3FD3', borderColor:'#5D3FD3' }} className="btn btn-lg px-4" onClick={() => routeChange('admin')}>{LocalizedText.adminConsole}</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
