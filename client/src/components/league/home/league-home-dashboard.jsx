import './league-home.scss'
import { Paper, Typography, Grid } from '@mui/material';
import HomeFixturesComponent from './league-home-fixtures';
import LeagueHomeNews from './league-home-news';
import LeagueHomeStats from './league-home-stats';
import LeagueHomeTable from './league-home-table';
import React from 'react';

const LeagueHomeDashboard = ({ news, fixtures, uniqueDates, table, top_scorers }) => {

	const leagueName = table[0].league.name
	const leagueLogo = table[0].league.logo

	return (
		<div className='league-home-dashboard-container'>
			<Typography variant="h5" gutterBottom className='section-heading'>
				<img src={leagueLogo} />
				{leagueName} Home
			</Typography>
			<Grid container className='league-home-dashboard'>
				<Grid item xs={3.5}>
					<HomeFixturesComponent fixtures={fixtures} uniqueDates={uniqueDates}/>
				</Grid>
				<Grid item xs={5}>
					<LeagueHomeNews news={news} />
				</Grid>
				<Grid item xs={3.5}>
					<div className='league-home-stats-column'>
						<LeagueHomeTable table={table} />
						<LeagueHomeStats top_scorers={top_scorers} />
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default LeagueHomeDashboard