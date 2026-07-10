import { Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';

const NotFound = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Container className='text-center py-5 mt-5'>
			<h1 className='display-1 fw-bold text-danger'>404</h1>
			<h3 className='mt-3'>
				La pagina <code>{location.pathname}</code> non esiste!
			</h3>
			<p className='text-muted mb-4'>Sembra che tu ti sia perso tra le nuvole...</p>
			<Button variant='primary' onClick={() => navigate('/')}>
				Torna alla home
			</Button>
		</Container>
	);
};

export default NotFound;