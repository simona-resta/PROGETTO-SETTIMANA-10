import { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_KEY = '5e925256225eb7ac8d20926e2150e8dc';

const WeatherDetail = ({ unit }) => {
	const { city } = useParams();
	const navigate = useNavigate();

	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const [weatherRes, forecastRes] = await Promise.all([
					fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}&lang=it`),
					fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}&lang=it`)
				]);

				if (!weatherRes.ok || !forecastRes.ok) {
					throw new Error('Città non trovata o errore nel recupero dati.');
				}

				const weatherData = await weatherRes.json();
				const forecastData = await forecastRes.json();

				if (mounted) {
					setWeather(weatherData);
					setForecast(forecastData.list.slice(0, 8));
				}
			} catch (err) {
				if (mounted) setError(err.message);
			} finally {
				if (mounted) setLoading(false);
			}
		};

		fetchData();
		return () => { mounted = false; };
	}, [city, unit]);

	const formatTime = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleTimeString('it-IT', {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

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

	const tempSymbol = unit === 'metric' ? '°C' : '°F';
	const speedSymbol = unit === 'metric' ? 'm/s' : 'mph';

	const chartData = forecast ? forecast.map(item => ({
		time: new Date(item.dt * 1000).getHours() + ':00',
		temp: Math.round(item.main.temp)
	})) : [];

	return (
		<Container fluid className='mt-4 px-4 pb-5'>
			<Card className='glass-card shadow-lg mx-auto border-0 w-100' style={{ maxWidth: '950px' }}>
				<Card.Body className='p-4 p-md-5'>
					
					<Row className='g-4 align-items-stretch'>
						<Col xs={12} md={5}>
							<Card className='glass-card border-0 h-100 p-4 text-center text-md-start d-flex flex-column justify-content-center shadow-sm'>
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
								
								<Col xs={6} sm={4}>
									<Card className='glass-card hover-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm'>
										<i className="bi bi-thermometer-half text-warning mb-2 fs-3"></i>
										<p className='text-white-50 small mb-1'>Percepita</p>
										<h5 className='fw-semibold mb-0'>{Math.round(weather.main.feels_like)}{tempSymbol}</h5>
									</Card>
								</Col>
								
								<Col xs={6} sm={4}>
									<Card className='glass-card hover-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm'>
										<i className="bi bi-droplet-fill text-info mb-2 fs-3"></i>
										<p className='text-white-50 small mb-1'>Umidità</p>
										<h5 className='fw-semibold mb-0'>{weather.main.humidity}%</h5>
									</Card>
								</Col>
								
								<Col xs={6} sm={4}>
									<Card className='glass-card hover-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm'>
										<i className="bi bi-arrow-down-up text-danger mb-2 fs-3"></i>
										<p className='text-white-50 small mb-1'>Min / Max</p>
										<h5 className='fw-semibold mb-0'>{Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°</h5>
									</Card>
								</Col>
								
								<Col xs={6} sm={4}>
									<Card className='glass-card hover-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm'>
										<i className="bi bi-wind text-light mb-2 fs-3"></i>
										<p className='text-white-50 small mb-1'>Vento</p>
										<h5 className='fw-semibold mb-0'>{weather.wind.speed} <span className='fs-6 fw-light'>{speedSymbol}</span></h5>
									</Card>
								</Col>

								<Col xs={6} sm={4}>
									<Card className='glass-card hover-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm'>
										<i className="bi bi-sunrise-fill text-warning mb-2 fs-3"></i>
										<p className='text-white-50 small mb-1'>Alba</p>
										<h5 className='fw-semibold mb-0'>{formatTime(weather.sys.sunrise)}</h5>
									</Card>
								</Col>

								<Col xs={6} sm={4}>
									<Card className='glass-card hover-card border-0 text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center shadow-sm'>
										<i className="bi bi-sunset-fill text-danger mb-2 fs-3"></i>
										<p className='text-white-50 small mb-1'>Tramonto</p>
										<h5 className='fw-semibold mb-0'>{formatTime(weather.sys.sunset)}</h5>
									</Card>
								</Col>

							</Row>
						</Col>
					</Row>

					<div className='mt-5'>
						<h5 className='mb-3 text-center text-white-50'>Previsioni prossime ore</h5>
						<div className='glass-card p-3 p-md-4' style={{ height: '300px' }}>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart data={chartData}>
									<CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.1)' />
									<XAxis dataKey='time' stroke='rgba(255,255,255,0.5)' />
									<YAxis stroke='rgba(255,255,255,0.5)' tickFormatter={(value) => `${value}${tempSymbol}`} />
									<Tooltip 
										formatter={(value) => [`${value}${tempSymbol}`, 'Temperatura']}
										contentStyle={{ background: '#000', border: '1px solid #444', borderRadius: '10px' }} 
										itemStyle={{ color: '#fff' }}
									/>
									<Line type='monotone' dataKey='temp' stroke='#ffffff' strokeWidth={3} dot={{ fill: '#fff' }} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div className='mt-5 text-center'>
						<Button variant='link' className='btn-outline-modern text-decoration-none px-4' onClick={() => navigate('/search')}>
							<i className="bi bi-search me-2"></i> Cerca un'altra città
						</Button>
					</div>

				</Card.Body>
			</Card>
		</Container>
	);
};

export default WeatherDetail;