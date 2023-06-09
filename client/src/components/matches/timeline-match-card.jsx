import React from 'react'

const TimelineMatchCard = ({match, idx}) => {
	const id = match.fixture.id
	const status = match.fixture.status;

	const league = `${match.league.country} ${match.league.name} ${match.league.round}`
	const events = match.events.length === 0 ? null : match.events

	const homeTeam = match.teams.home.name
	const awayTeam = match.teams.away.name

	const homeGoals = match.goals.home
	const awayGoals = match.goals.away

	const homeIcon = match.teams.home.logo;
	const awayIcon = match.teams.away.logo;

	const displayStatus = (status) => {
		if (status.long === 'First Half' || status.long === "Second Half") {
			return `${status.elapsed}'`
		}

		if (status.short === 'FT') {
			return 'Final'
		}
	}

	return (
		<li key={idx}>
			<div className='timeline-match-card'>
				<div className='home-team-bar'>
					<p>
						{homeTeam}
					</p>
					<p>
						{homeGoals}
					</p>
				</div>
				<div className='away-team-bar'>
					<p>
						{awayTeam}
					</p>
					<p>
						{awayGoals}
					</p>
				</div>
				<div className='status-area'>
					{displayStatus(match.fixture.status)}
				</div>
			</div>
		</li>
	)
}

export default TimelineMatchCard;
