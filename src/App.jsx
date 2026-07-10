import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';

import CustomNavbar from './assets/components/CustomNavbar';
import Footer from './assets/components/Footer';
import Home from './assets/components/Home';
import Search from './assets/components/Search';
import WeatherDetail from './assets/components/WeatherDetail';
import NotFound from './assets/components/NotFound';

function App() {
	const [unit, setUnit] = useState('metric');

	const toggleUnit = () => {
		setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
	};

	return (
		<BrowserRouter>
			<CustomNavbar unit={unit} toggleUnit={toggleUnit} />
			
			<main className='flex-grow-1 w-100 py-4'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='/weather/:city' element={<WeatherDetail unit={unit} />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>

			<Footer />
		</BrowserRouter>
	);
}

export default App;