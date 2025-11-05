import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Signup from './pages/signup';
import Login from './pages/login';
import Footer from './components/dashboardComponents/Footer';

export default function App() {
	return (
			<BrowserRouter>
				{/* Keep overall min height and text color, but let pages control their own width */}
						<div className="min-h-screen text-slate-900 flex flex-col">
							<main className="flex-1">
								<Routes>
									<Route path="/" element={<Dashboard />} />
									<Route path="/signup" element={<Signup />} />
									<Route path="/login" element={<Login />} />
								</Routes>
							</main>

							{/* Footer shown on all pages */}
							<Footer />
						</div>
			</BrowserRouter>
	)
}
