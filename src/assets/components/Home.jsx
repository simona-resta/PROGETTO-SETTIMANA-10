import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Home = () => {
	const navigate = useNavigate();

	return (
		<Container fluid className='d-flex align-items-center justify-content-center text-center px-4' style={{ minHeight: '70vh' }}>
			<div className='glass-card p-4 p-sm-5 mx-auto border-0 shadow-lg w-100' style={{ maxWidth: '750px' }}>
				<h1 className='display-4 fw-bold mb-3' style={{ letterSpacing: '-0.03em' }}>Benvenuto in Meteo</h1>
				<p className='lead text-white-70 max-w-md mx-auto mb-4 fw-light'>
					Scopri le condizioni meteo di qualsiasi località nel mondo. 
					Interfaccia responsive, dati accurati e fluidità garantita.
				</p>
				<Button 
					className='btn-modern px-5 py-3 fs-5 mt-2'
					onClick={() => navigate('/search')}
				>
					Inizia la Ricerca
				</Button>
			</div>
		</Container>
	);
};

export default Home;