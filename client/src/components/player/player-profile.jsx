import './player-profile.scss';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPlayer } from '../../actions/api_actions';
import PlayerOverview from './player-overview';
import PlayerStats from './player-stats';
import LoadingMessage from '../util/loading/loading-screen';
import NoDataMessage from '../util/no-data/no-data-message';

const PlayerProfile = () => {
	const dispatch = useDispatch();
	const { playerId }= useParams();
	
	let player = useSelector(state => state.player.player);
	const isLoading = useSelector(state => state.player.isLoading);	
	
	useEffect(() => {
		dispatch(fetchPlayer(playerId))
		.catch(error => {
			console.log('Error fetching player', error);
		})
	}, [])

	useEffect(() => {

	}, [isLoading])
	
	if (isLoading) {
		return <LoadingMessage/>
	}
	
	if (!player) {
		return <NoDataMessage/>
	}


	player = player[0];
	const statistics = player.statistics;

	return (
		<div className='player-profile-container'>
			<PlayerOverview player={player}/>
			<PlayerStats statistics={statistics}/>
		</div>
	)
}

export default PlayerProfile;