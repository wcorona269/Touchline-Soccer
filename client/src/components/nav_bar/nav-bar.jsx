import './nav-bar.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoggedInNav from './logged-in-nav';
import LoggedOutNav from './logged-out-nav';

const NavBar = () => {
	const currentUser = useSelector(state => state.session.user);
	let component;

	useEffect(() => {

	}, [currentUser, component])

	currentUser === null ? component = <LoggedOutNav/> : component = <LoggedInNav/>

	return (
		<nav className='nav-bar-container' id='nav-bar'>
			<Link to='/'>
				touchline
			</Link>
			{component}
		</nav>
	)
}

export default NavBar;