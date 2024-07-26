import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  }
  return (
    <Navbar bg="primary" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand onClick={() => routeChange('')}>Help Desk</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => routeChange('create')}>Create Ticket</Nav.Link>
          <Nav.Link onClick={() => routeChange('admin')}>Admin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;