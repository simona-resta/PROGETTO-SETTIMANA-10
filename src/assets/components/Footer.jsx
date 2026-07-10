import { Container } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer 
			className='text-light py-3 mt-auto w-100' 
			style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
		>
			<Container fluid className='text-center px-4'>
				<p className='mb-0 small opacity-75'>&copy; MeteoApp 2026 - Powered by OpenWeather API</p>
			</Container>
		</footer>
	);
};

export default Footer;