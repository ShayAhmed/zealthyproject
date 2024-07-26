import { Container, Nav, Navbar, Row } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="/">Help Desk</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/create">Create Ticket</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;