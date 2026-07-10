import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const PRESET_CITIES = [
	'Roma, IT',   
	'London',    
	'Paris',     
	'Berlin',     
	'Madrid',    
	'Amsterdam',  
	'Vienna',     
	'Washington',  
	'Tokyo',       
	'Ottawa'      
];

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

	const handleSelect = (e) => {
		const selected = e.target.value;
		if (selected) {
			setCity(selected);
			setError(false);
		}
	};

	return (
		<Container fluid className='d-flex align-items-center justify-content-center px-4' style={{ minHeight: '65vh' }}>
			<Card className='glass-card border-0 shadow p-4 p-md-5 w-100' style={{ maxWidth: '520px' }}>
				<h2 className='text-center fw-bold mb-2'>Cerca una città</h2>
				<p className='text-white-50 text-center mb-4 small'>
					Inserisci una città, oppure seleziona una delle capitali preimpostate per visualizzare il meteo in tempo reale.
				</p>
				
				{error && (
					<Alert variant='danger' className='text-center border-0 py-2 rounded-3 mb-3 fw-bold' style={{ backgroundColor: '#ff4d4d', color: '#ffffff' }}>
						 Attenzione: Inserisci o seleziona il nome di una città!
					</Alert>
				)}

				<Form onSubmit={handleSearch}>
					<Form.Group className='mb-3'>
						<Form.Control
							type='text'
							placeholder='Es. Milano, Tokyo, London...'
							value={city}
							onChange={(e) => setCity(e.target.value)}
							autoFocus
							className='form-control text-center'
						/>
					</Form.Group>

					<div className="text-center text-white-50 mb-3 small fw-bold">OPPURE</div>

					<Form.Group className='mb-4'>
						<Form.Select
							value={PRESET_CITIES.includes(city) ? city : ""}
							onChange={handleSelect}
							className='form-control text-center'
							style={{ cursor: 'pointer' }}
						>
							<option value="">-- Seleziona una capitale --</option>
							{PRESET_CITIES.map((c, index) => (
								<option key={index} value={c} className="text-dark">
									{c}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Button type='submit' className='btn-modern w-100 py-2 fs-5'>
						Cerca Meteo
					</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default Search;