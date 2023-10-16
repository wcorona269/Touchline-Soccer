import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/post_actions';

const CreatePost = () => {
	const dispatch = useDispatch()
	const [post, setPost] = useState('');
	const [isValidPost, setIsValidPost] = useState(false);
	const [postLength, setPostLength] = useState(0);

	useEffect(() => {
		if (post.length === 0) setIsValidPost(false)
		if (post.length > 0 && post.length <= 200) {
			setIsValidPost(true)
		} else {
			setIsValidPost(false)
		}

		setPostLength((post.length / 200) * 100);
	}, [post])
	
	const handleSubmit = () => {
		dispatch(createPost(post))
	}

	const handleChange = (event) => {
		setPost(event.target.value)
	}

	return (
		<Paper className='timeline-paper' elevation={6}>
			<TextField
				id="outlined-multiline-flexible"
				placeholder='talk footy...'
				multiline
				value={post}
				onChange={handleChange}
			/>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'right', marginTop: '1rem'}}>
				<Box sx={{ position: 'relative', display: 'inline-flex', marginRight: '1rem' }}>
					<CircularProgress variant="determinate" value={postLength} />
					<Box
						sx={{
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							position: 'absolute',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Typography variant="caption" component="div" color="text.secondary">
							{ 200 - post.length }
						</Typography>
					</Box>
				</Box>

				{isValidPost === true ? 
					<Button 
						className='create-post-btn' 
						variant='contained' 
						onClick={handleSubmit}
						sx={{width: '25%'}}>Post
					</Button> :
					<Button 
						className='create-post-btn' 
						variant='contained' 
						disabled
						sx={{width: '25%'}}>Post
					</Button>
				}
			</Box>
		</Paper>
	)
}

export default CreatePost