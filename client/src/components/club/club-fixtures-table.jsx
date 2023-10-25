import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import monthsOfYear from './monthsOfYear';
import { Link, Box, Grid, Paper, TableBody, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import HomeFixturesComponent from '../league/home/league-home-fixtures';
import DisplayTime from '../util/display-time';
import MatchCard from '../league/match-card';

export const formatDate = (date) => {
	const dateString = new Date(date);
	const month = dateString.getMonth();
	const day = dateString.getDate();
	const abbreviatedMonth = monthsOfYear[month].slice(0, 3);
	return `${abbreviatedMonth} ${day}`;
}

const ClubFixturesTable = ({fixtures}) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const handleClick = (id) => {
		navigate(`/match/${id}`);
	}
	
	const displayFixtures = (fixtures) => {
		let result = [];

		fixtures.map((fixture, idx) => {
			let league = [fixture.league.name, fixture.league.logo];
			
			result.push(
				<MatchCard key={idx} fixture={fixture} league={league} />
			)
		})

		return result;
	}

	return (
		<Grid container spacing={2}>
			{displayFixtures(fixtures)}
		</Grid>
	)
}

export default ClubFixturesTable;