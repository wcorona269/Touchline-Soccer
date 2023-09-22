import './league-table-dashboard.scss';
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import NoDataMessage from '../util/no-data/no-data-message';
import MultiTableDashboard from './multi-table-dashboard';

const LeagueTableDashboard = ({table}) => {

	useEffect(() => {

	}, [table])


	if (!table.length) {
		return <NoDataMessage/>
	}

	let leagueInfo = table[0]['league'];
	let standings = leagueInfo['standings'];

	if (standings.length > 1) {
		return <MultiTableDashboard standings={standings}/>
	}

	standings = leagueInfo['standings'][0];

	if (!standings.length) {
		return <NoDataMessage/>
	}


	const columns = ['Position', 'Club', 'Played', 'Won', 'Drawn', 'Lost', 'GF', 'GC', 'GD', 'Points', 'Form'];

	const displayForm = (form) => {
		let icons = {
			'W': '\u{1F7E2}',
			'D': '\u{1F7E1}',
			'L': '\u{1F534}'
		};

		return (
			<p id='form-display'>
				{form.split('').map((symbol, index) => (
					<span key={index}>{icons[symbol]}</span>
				))}
			</p>
		);
	};

	if (!standings.length) {
		return <NoDataMessage/>
	}


	return (
		<table className='league-table'>
			<thead>
				<tr>
					{columns.map((column, idx) => (
						<th key={idx} className='league-table-header' id={column}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody className='league-table-body'>
				{standings.map((club, idx) => {
					const clubId = club['team']['id'];
					const rank = club['rank'];
					const clubName = club['team']['name'];
					const clubLogo = club['team']['logo'];
					const clubData = club['all'];
					const goalsDiff = club['goalsDiff'];
					const points = club['points'];
					const form = club['form']

					return (
					<tr key={idx} className='league-table-row'>
						<td>{club['rank']}</td>
						<td id='Club' >
							<Link to={`/club/${clubId}`}>
								<img src={club['team']['logo']} alt=''/>
								<span>{clubName}</span>
							</Link>
						</td>
						<td>{clubData['played']}</td>
						<td>{clubData['win']}</td>
						<td>{clubData['lose']}</td>
						<td>{clubData['draw']}</td>
						<td>{clubData['goals']['for']}</td>
						<td>{clubData['goals']['against']}</td>
						<td>{goalsDiff}</td>
						<td>{points}</td>
						<td>{displayForm(form)}</td>
					</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default LeagueTableDashboard

