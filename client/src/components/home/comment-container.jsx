import { Avatar, Box, ButtonGroup, Divider, Grid, IconButton, Link, Paper, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '@mui/material/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createLike, deleteLike, fetchPosts } from '../../actions/post_actions';
import { createNotification } from '../../actions/notification_actions';
import { useNavigate } from 'react-router-dom';

const CommentContainer = ({ comment, idx }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState(0);
	const [commentLikes, setCommentLikes] = useState(comment?.likes?.length || 0);
	const user_id = useSelector(state => state.users.user.id);
	const username = useSelector(state => state.users?.user?.username);
	const theme = useTheme();

	useEffect(() => {
		for (let like of comment.likes) {
			if (like.user_id === user_id)	{
				setIsLiked(true)
			}
		}
	}, []);
	
	const handleLike = () => {
		const like_info = {
			'user_id': user_id,
			'comment_id': comment.id
		}
		const notif_info = {
			'recipient_id': comment.user_id,
			'sender_id': user_id,
			'message': `${username} liked your comment`,
			'post_id': comment.post_id
		}
		if (isLiked === true) {
			dispatch(deleteLike(like_info));
			setCommentLikes(commentLikes - 1)
		} else {
			dispatch(createLike(like_info))
			dispatch(createNotification(notif_info))
			setCommentLikes(commentLikes + 1);
		}
		setIsLiked(!isLiked)
	};

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '.5rem' }} key={idx}>
				<Grid container spacing={3}>
					<Grid item xs="auto">
						<Avatar />
					</Grid>
					<Grid item xs sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', alignItems: 'left', paddingLeft: '.5rem !important'}}>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
							<Link underline='hover' onClick={() => navigate(`/user/${user_id}`)} >
								<Typography variant='body2' sx={{ marginBottom: '.25rem', fontFamily: theme.typography.bold }}>
									{comment.username}
								</Typography>
							</Link>
							</Box>
							<Box onDoubleClick={() => handleLike()} sx={{ padding: '.5rem', paddingTop: 0, paddingLeft: 0, width: '95%' }} >
								<Typography variant='body2'>
									{comment.text}
								</Typography>
							</Box>
					</Grid>
					<Grid item xs='auto'>
						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: theme.palette.text.secondary }}>
							<IconButton aria-label="favorite" size="small" onClick={() => handleLike()} sx={{ padding: '0px', color: theme.palette.primary.main }}>
								{isLiked ?
									<FavoriteIcon fontSize='small' sx={{ height: 18, width: 18 }} /> :
									<FavoriteBorderIcon fontSize='small' sx={{ height: 18, width: 18 }} />
								}
							</IconButton>
							<Typography variant='body2' sx={{ fontSize: 15 }}>
								{commentLikes}
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Divider/>
			</Box>
		</>
	)
}

export default CommentContainer;
