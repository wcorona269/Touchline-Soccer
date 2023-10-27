import { Box, CircularProgress, Paper, Skeleton, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveMatches } from '../../actions/api_actions';
import LiveFixturesDisplay from './live-fixtures-display';

const HomeFixturesColumn = () => {
	const dispatch = useDispatch();
	const matches = useSelector(state => state.matches.matches);
	const isLoading = useSelector(state => state.matches.isLoading);
	useEffect(() => {dispatch(fetchLiveMatches())}, [])
	useEffect(() => {}, [isLoading])
	

	return (
		<Paper elevation={2} id='home-fixtures-paper' sx={{position: 'sticky', top: '2rem'}}>
			<Typography className='section-heading' variant='h5'>
				Live Fixtures
			</Typography>
			{ isLoading ?
				<Box sx={{height: '20rem', width: '100%', display: 'flex', alignItems: 'center' }}>
					<CircularProgress
						sx={{ margin: 'auto' }}
					/>
				</Box>
				  : <LiveFixturesDisplay matches={matches}/>
			}
		</Paper>
	)
}

export default HomeFixturesColumn;