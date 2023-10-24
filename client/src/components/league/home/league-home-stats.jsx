import React, { useEffect, useState } from 'react'
import { Paper, Button, Box, Typography, List, ListItem, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const LeagueHomeStats = ({top_scorers}) => {
	const [showMore, setShowMore] = useState(false);

	const handleChange = () => {
		setShowMore(!showMore)
	}

	const displayTable = (top_scorers) => {
		let result = [];

		for (let i = 0; i < top_scorers.length; i++) {
			const id = top_scorers[i].player.id;
			const name = top_scorers[i].player.name;
			const photo = top_scorers[i].player.photo;
			const goals = top_scorers[i].statistics[0].goals.total;

			result.push(
				<TableRow key={i}>
					<TableCell component="th" scope="row">
						<Typography variant='body2' id='team-name'>
							<Link to={`/player/${id}`}>
								<img src={photo} />
								{name}
							</Link>
						</Typography>
					</TableCell>
					<TableCell align="right">{goals}</TableCell>
				</TableRow>
			)
		}


		return result;
	}

	return (
		<Paper className='home-paper' id='league-home-table' elevation={6}>
			<Typography variant='h6' gutterBottom className='section-heading' >
				Top Scorers
			</Typography>
			<div
				style={{
					height: showMore ? '600px' : '250px',
					overflow: 'hidden',
					transition: 'height 0.3s ease-in-out',
					display: 'flex',
					alignItems: 'flex-start'
				}}
			>
				<TableContainer>
					<Table size='small' aria-label='a dense table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>Player</TableCell>
								<TableCell align='right'>Goals</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{displayTable(top_scorers)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<Button variant="outlined" startIcon={!showMore ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />} onClick={handleChange} className='show-more-button'>
				{!showMore ? 'Show More' : 'Show Less'}
			</Button>
		</Paper>
	)
}

export default LeagueHomeStats;