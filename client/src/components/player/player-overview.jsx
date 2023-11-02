import React from 'react'
import shorthandMonthsOfYear from '../league/shorthandMonths';
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, Card, CardMedia, CardContent, TableContainer, TableRow, Typography, useTheme } from '@mui/material';
import SectionHeading from '../util/section-heading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const PlayerOverview = ({player}) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const fullName = `${player.player.firstname} ${player.player.lastname}`

	const displayBirthDate = (birthInfo) => {
		if (birthInfo === 'N/A') return 'N/A'

		let [year, month, day] = birthInfo.date.split('-');
		return `${day} ${shorthandMonthsOfYear[Number(month)]} ${year}`
	}

	const name = player.player.name || 'Name Unavailable';
	const photo = player.player.photo;
	const age = player.player.age || 'N/A';
	const nationality = player.player.nationality || 'N/A';
	const birth = player.player.birth || 'N/A';
	const birthPlace = `${player.player.birth.place}, ${player.player.birth.country}`
	const height = player.player.height || 'N/A';
	const weight = player.player.weight || 'NA';

	const content = [
		<IconButton sx={{ p: 0, m: 0, marginRight: 2 }} onClick={() => navigate(-1)}>
			<ArrowBackIcon />
		</IconButton>,
		name
	]

	return (
		<Paper elevation={1}>
			<SectionHeading variant='h5' content={content} />
			<Grid container sx={{padding: 1}}>
				<Grid item xs={4}>
					<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						<Card sx={{height: 250}}>
							<CardMedia
								component="img"
								image={photo}
								alt={name}
							/>
							<CardContent>
								<Typography variant='h6'>
									{name}
								</Typography>
								<Typography variant='caption' sx={{color: theme.palette.text.secondary }} >
									{age} years old
								</Typography>
							</CardContent>
						</Card>
					</Box>
				</Grid >
				<Grid item xs={8}>
					<TableContainer sx={{ border: `1px solid ${theme.palette.divider}` }}>
						<Table size='small' aria-label='a dense table' >
							<TableBody>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold, backgroundColor: theme.palette.action.hover }} component='th' align='center' colSpan={2}>
										Personal Information
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>
										Full Name
									</TableCell>
									<TableCell>
										{fullName}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Age</TableCell>
									<TableCell>{age}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Nationality</TableCell>
									<TableCell>
										{nationality}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Date of Birth</TableCell>
									<TableCell>{displayBirthDate(birth)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Place of Birth</TableCell>
									<TableCell>{birthPlace}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Height</TableCell>
									<TableCell>{height}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Weight</TableCell>
									<TableCell>{weight}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default PlayerOverview;