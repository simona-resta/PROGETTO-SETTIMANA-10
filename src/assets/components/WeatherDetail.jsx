import { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';

const API_KEY = '5e925256225eb7ac8d20926e2150e8dc';

const WeatherDetail = () => {
	const { city } = useParams();
	const navigate = useNavigate();

	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		setError(null);

		const fetchWeather = async () => {
			try {
				const res = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
				);
				
				if (!res.ok) {
					if (res.status === 404) {
						throw new Error(`Nessun risultato trovato per "${city}". Assicurarsi di aver inserito correttamente il nome della città o della nazione.`);
					}
					throw new Error('Errore nel recupero dei dati meteorologici.');
				}

				const data = await res.json();
				if (mounted) setWeather(data);
			} catch (err) {
				if (mounted) setError(err.message);
			} finally {
				if (mounted) setLoading(false);
			}
		};

		fetchWeather();
		return () => { mounted = false; };
	}, [city]);

	if (loading) {
		return (
			<Container fluid className='text-center mt-5 py-5 px-4'>
				<Spinner animation='border' variant='light' style={{ width: '3rem', height: '3rem' }} />
				<h4 className='mt-4 fw-light text-white-50'>Aggiornamento meteo per {city}...</h4>
			</Container>
		);
	}

	if (error) {
		return (
			<Container fluid className='mt-5 px-4 d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
				<Alert variant='danger' className='glass-card text-center w-100 border-0 p-4 p-md-5' style={{ maxWidth: '550px', borderLeft: '6px solid #ff4d4d' }}>
					<h4 className='fw-bold mb-3' style={{ color: '#ff4d4d' }}>
                        <i className="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
                         Città non trovata
                    </h4>
					<p className='mb-4 text-white-50 fs-5'>{error}</p>
					<Button className='btn-modern px-4 py-2 shadow-sm' onClick={() => navigate('/search')}>
						Torna alla ricerca
					</Button>
				</Alert>
			</Container>
		);
	}

	return (
		<Container fluid className='mt-4 px-4'>
			<Card className='glass-card shadow-lg mx-auto border-0 w-100' style={{ maxWidth: '950px' }}>
				<Card.Body className='p-4 p-md-5'>
					
					<Row className='g-4 align-items-stretch'>
						
						<Col xs={12} md={5}>
							<Card className='glass-card border-0 h-100 p-4 text-center text-md-start d-flex flex-column justify-content-center shadow-sm' style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
								<h2 className='fw-bold display-5 mb-1'>{weather.name}, {weather.sys.country}</h2>
								<p className='text-white-50 fs-5 text-capitalize mb-3'>{weather.weather[0].description}</p>
								
								<div className='d-flex align-items-center justify-content-center justify-content-md-start gap-2'>
									<h1 className='display-1 fw-bold mb-0' style={{ letterSpacing: '-0.04em' }}>
										{Math.round(weather.main.temp)}°
									</h1>
									<img 
										src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
										alt="Weather icon"
										style={{ width: '100px', height: '100px', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.15))' }} 
									/>
								</div>
							</Card>
						</Col>

						<Col xs={12} md={7}>
							<Row className='g-3 h-100'>
								
								<Col xs={6}>
									<Card className='glass-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm' style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
										<i className="bi bi-thermometer-half text-warning mb-2 fs-2"></i>
										<p className='text-white-50 small mb-1'>Percepita</p>
										<h4 className='fw-semibold mb-0'>{Math.round(weather.main.feels_like)}°C</h4>
									</Card>
								</Col>
								
								<Col xs={6}>
									<Card className='glass-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm' style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
										<i className="bi bi-droplet-fill text-info mb-2 fs-2"></i>
										<p className='text-white-50 small mb-1'>Umidità</p>
										<h4 className='fw-semibold mb-0'>{weather.main.humidity}%</h4>
									</Card>
								</Col>
								
								<Col xs={6}>
									<Card className='glass-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm' style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
										<i className="bi bi-arrow-down-up text-danger mb-2 fs-2"></i>
										<p className='text-white-50 small mb-1'>Min / Max</p>
										<h4 className='fw-semibold mb-0'>{Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°</h4>
									</Card>
								</Col>
								
								<Col xs={6}>
									<Card className='glass-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm' style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
										<i className="bi bi-wind text-light mb-2 fs-2"></i>
										<p className='text-white-50 small mb-1'>Vento</p>
										<h4 className='fw-semibold mb-0'>{weather.wind.speed} <span className='fs-6 fw-light'>km/h</span></h4>
									</Card>
								</Col>

							</Row>
						</Col>
					</Row>

					<div className='mt-5 text-center'>
						<Button variant='link' className='btn-outline-modern text-decoration-none px-4' onClick={() => navigate('/search')}>
							Cerca un'altra città
						</Button>
					</div>

				</Card.Body>
			</Card>
		</Container>
	);
};

export default WeatherDetail;