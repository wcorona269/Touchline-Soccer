import './post-container.scss'
import { Avatar, Box, Button, ButtonGroup, Grid, Link, Paper, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import CommentSection from './comment-section';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createLike, createRepost, deleteLike, deleteRepost, fetchPosts } from '../../actions/post_actions';
import { createNotification, deleteNotification } from '../../actions/notification_actions';
import { showModal } from '../../actions/modal_actions'
import { useNavigate } from 'react-router-dom';

const PostContainer = ({ post }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const user_id = useSelector(state => state.users?.user?.id)
	const username = useSelector(state => state.users?.user?.username)
	const [postLikes, setPostLikes] = useState(post.likes.length);
	const [reposts, setReposts] = useState(post.reposts.length);
	const [showComments, setShowComments] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isReposted, setIsReposted] = useState(false);

	useEffect(() => {
		for (let like of post.likes) {
			if (like.user_id === user_id) {
				setIsLiked(true)
			}
		}

		for (let repost of post.reposts) {
			if (repost.id === user_id) {
				setIsReposted(true)
			}
		}
	}, []);

	const timeAgo = (date) => {
		const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
		return <span>{timeAgo.split(' ').slice(1, 3).map((ele, idx) => {
			return idx === 1 ? ele.slice(0, 1) : ele
		})}</span>;
	};

	const handleLike = () => {
		const like_info = {
			'post_id': post.id,
			'user_id': user_id,
		}

		const notif_info = {
			'recipient_id': post.user_id,
			'sender_id': user_id,
			'message': `${username} liked your post`,
			'post_id': post.id
		}

		if (isLiked === true) {
			dispatch(deleteLike(like_info))
			setPostLikes(postLikes - 1)
		} else {
			dispatch(createLike(like_info))
			dispatch(createNotification(notif_info))
			setPostLikes(postLikes + 1)
		}
		setIsLiked(!isLiked);
	}

	const handleRepost = () => {
		const repost_info = {
			'post_id': post.id,
			'user_id': user_id,
		}

		if (isReposted === true) {
			dispatch(deleteRepost(repost_info))
			setReposts(reposts - 1)
		} else {
			const notif_info = {
				'recipient_id': post.user_id,
				'sender_id': user_id,
				'message': `${username} reposted your post`,
				'post_id': post.id
			}
			dispatch(createRepost(repost_info));
			dispatch(createNotification(notif_info));
			setReposts(reposts + 1)
		}
		setIsReposted(!isReposted);
	}


	const buttons = [
		<Button aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: showComments ? theme.palette.primary.main : theme.palette.grey['700'] }} onClick={() => setShowComments(!showComments)}>
			<ChatBubbleOutlineIcon sx={{ marginRight: '.25rem' }} fontSize='medium'/>
			{post.comments.length}
		</Button>,
		<Button aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: isReposted ? theme.palette.primary.main : theme.palette.grey['700'] }} onClick={() => handleRepost()} >
			<RepeatIcon sx={{ marginRight: '.25rem' }} fontSize='medium'/>
			{reposts}
		</Button>,
		<Button aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: isLiked ? theme.palette.primary.main : theme.palette.grey['700'] }} onClick={handleLike} >
			{isLiked ? <FavoriteIcon sx={{ marginRight: '.25rem' }} fontSize='medium' /> : <FavoriteBorderIcon sx={{ marginRight: '.25rem' }} />  }
			{postLikes}
		</Button>,
	];

	return (
		<Paper id='post-container' className='timeline-paper' elevation={2} key={post.id}>
			<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
				<Avatar sx={{ marginRight: '.5rem' }} />
				<Box sx={{ display: 'flex', flexDirection: 'column'}}>
					<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '.5rem'}}>
						<Typography variant='body1' sx={{ fontFamily: theme.typography.bold }}>
							<Link underline='hover'>
								{post.username}
							</Link>
						</Typography>
						<Typography variant='caption' sx={{ color: 'var(--darkgray)' }}>
							{timeAgo(post.created_at)}
						</Typography>
					</Box>
					<Typography variant='body1'>
						{post.text}
					</Typography>
				</Box>
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '.5rem'}}>
				{buttons}
			</Box>
			{showComments && <CommentSection comments={post.comments} post={post} />}
		</Paper>
	)
}

export default PostContainer;