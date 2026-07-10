import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

const CustomNavbar = ({ unit, toggleUnit }) => {
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
                    <Nav className='ms-auto mt-3 mt-md-0 align-items-md-center'>
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
                        
                        <Button 
                            onClick={toggleUnit}
                            className="btn-outline-modern ms-md-3 mt-3 mt-md-0 d-flex align-items-center justify-content-center"
                            style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
                            title="Cambia unità di misura"
                        >
                            <i className="bi bi-thermometer-half me-2"></i>
                            {unit === 'metric' ? 'Passa a °F' : 'Passa a °C'}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;