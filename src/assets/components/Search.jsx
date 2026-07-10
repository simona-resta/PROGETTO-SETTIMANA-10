import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Search = () => {
	const [city, setCity] = useState('');
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		if (city.trim() === '') {
			setError(true);
			return;
		}
		setError(false);
		navigate(`/weather/${city.trim()}`);
	};

	return (
		<Container fluid className='d-flex align-items-center justify-content-center px-4' style={{ minHeight: '65vh' }}>
			<Card className='glass-card border-0 shadow p-4 p-md-5 w-100' style={{ maxWidth: '520px' }}>
				<h2 className='text-center fw-bold mb-2'>Cerca una città</h2>
				<p className='text-white-50 text-center mb-4 small'>
					Inserisci una città o una nazione per visualizzare i dati meteorologici in tempo reale.
				</p>
				
				{error && (
					<Alert variant='danger' className='text-center border-0 py-2 rounded-3 mb-3 fw-bold' style={{ backgroundColor: '#ff4d4d', color: '#ffffff' }}>
						 Attenzione: Inserisci il nome di una città!
					</Alert>
				)}

				<Form onSubmit={handleSearch}>
					<Form.Group className='mb-4'>
						<Form.Control
							type='text'
							placeholder='Es. Milano, Tokyo, London...'
							value={city}
							onChange={(e) => setCity(e.target.value)}
							autoFocus
							className='bg-white bg-opacity-10 border-0 text-white placeholder-white-50 py-3 px-4 rounded-3 shadow-none text-center fs-5'
							style={{ colorScheme: 'dark' }}
						/>
					</Form.Group>
					<Button type='submit' className='btn-modern w-100 py-3 fs-5 shadow-sm'>
						Mostra Meteo
					</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default Search;