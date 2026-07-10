import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

const CustomNavbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <Navbar 
            expand='md' 
            variant='dark' 
            className='border-bottom border-white border-opacity-10 py-3 w-100' 
            style={{ background: 'rgba(0,0,0,0.15)' }}
        >
            <Container fluid className="px-4">
                <Navbar.Brand as={Link} to='/' className='fw-bold fs-4 tracking-tight text-white'>
                    <i className="bi bi-sun-fill me-2 text-warning"></i> Meteo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='main-nav' className='border-0 shadow-none' />
                <Navbar.Collapse id='main-nav'>
                    <Nav className='ms-auto mt-3 mt-md-0'>
                        <Nav.Link 
                            as={Link} 
                            to='/' 
                            className={`nav-link-outline ${isActive('/') ? 'active' : ''}`}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to='/search' 
                            className={`nav-link-outline ${isActive('/search') ? 'active' : ''}`}
                        >
                            Ricerca Meteo
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;