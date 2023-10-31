import './match-overview.scss';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMatch } from '../../actions/api_actions';
import MatchOverviewHeader from './match-overview-header';
import MatchInfo from './match-info/match-info';
import LoadingMessage from '../util/loading/loading-screen';
import SectionHeading from '../util/section-heading';
import NoDataMessage from '../util/no-data/no-data-message';
import ScrollToTopOnLoad from '../util/scroll-to-top-on-load';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import HomeFixturesColumn from '../home/home-fixtures-column';
import Lineups from './match-info/lineups';
import MatchStats from './match-info/match-stats';
import EventsTimeline from './match-info/events-timeline'
import MatchInfoTable from './match-info/match-info-table';
import MiniLeagueTable from './match-info/mini-league-table';

const MatchOverview = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.match.isLoading);
	const { id } = useParams();
	const match = useSelector(state => state.match.match);

	useEffect(()=> { dispatch(fetchMatch(id)) }, [])
	useEffect(() => {}, [isLoading])

	if (isLoading) return <LoadingMessage/>
	if (!match) return <NoDataMessage/>

	const homeTeam = match[0]?.teams?.home?.name;
	const awayTeam = match[0]?.teams?.away?.name;
	const homeLogo = match[0]?.teams?.home?.logo;
	const awayLogo = match[0]?.teams?.away?.logo;

	const header = (
		<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 1 }}>
			<Typography variant='body1' sx={{ display: 'flex', alignItems: 'center' }} >
				<img src={homeLogo} style={{ width: '2rem', height: '2rem', marginRight: '.25rem' }} />
				{homeTeam}
			</Typography>
			<Typography variant='body1' sx={{ display: 'flex', alignItems: 'center' }} >
				{awayTeam}
				<img src={awayLogo} style={{ width: '2rem', height: '2rem', marginLeft: '.25rem' }} />
			</Typography>
		</Box>
	)
	
	return (
		<>
			<Grid item xs={6}>
				<Paper>
					<SectionHeading variant='h5' content='Match Summary' />
					<Stack spacing={2} sx={{marginTop: 1}}>
						<MatchOverviewHeader match={match[0]}/>
						<MatchStats match={match[0]} header={header} />
						<EventsTimeline match={match[0]} header={header} />
						<Lineups lineups={match[0]?.lineups} header={header} />
					</Stack>
				</Paper>
			</Grid>
			<Grid item xs={3} sx={{ position: 'sticky', top: '1rem' }}>
				<Stack spacing={2}>
					<MatchInfoTable match={match[0]} />
					<MiniLeagueTable match={match[0]} homeTeam={homeTeam} awayTeam={awayTeam} />
				</Stack>
			</Grid>
		</>
	)
}

export default MatchOverview;