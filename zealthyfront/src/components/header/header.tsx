import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LocalizedText from '../../languages/en.json';

const Header = () => {
  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  }
  return (
    <Navbar style={{ backgroundColor: '#5D3FD3' }} data-bs-theme="dark" >
      <Container>
        <Navbar.Brand onClick={() => routeChange('')}>{LocalizedText.helpDesk}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => routeChange('create')}>{LocalizedText.createTicket}</Nav.Link>
          <Nav.Link onClick={() => routeChange('admin')}>{LocalizedText.adminConsole}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;