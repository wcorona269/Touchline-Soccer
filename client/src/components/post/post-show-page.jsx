import { Avatar, Box, Button, CircularProgress, Divider, Grid, IconButton, Link, Paper, Typography, dividerClasses, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchPost } from '../../actions/post_actions';
import RepostButton from '../home/repost-popper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { createLike, createRepost, deleteLike, deleteRepost, fetchPosts } from '../../actions/post_actions';
import { createNotification } from '../../actions/notification_actions';
import CreateComment from '../home/create-comment';
import CommentContainer from '../home/comment-container';

const PostShowPage = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();
	const { id } = useParams();
	const post = useSelector(state => state.posts?.post);
	const user_id = useSelector(state => state.users?.user?.id);
	const isLoading = useSelector(state => state.posts.isLoading);
	const username = useSelector(state => state.users?.user?.username);

	const [postLikes, setPostLikes] = useState(post.likes.length);
	const [reposts, setReposts] = useState(post.reposts.length);
	const [createComment, setCreateComment] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isReposted, setIsReposted] = useState(false);

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

	useEffect(() => {
		for (let like of post.likes) {
			if (like.user_id === user_id) {
				setIsLiked(true)
			}
		}
	}, [post]);

	useEffect(() => {
		if (id !== post?.id && !isLoading) {
			dispatch(fetchPost(id));
		}
	}, [id]);

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

	const displayComments = (comments) => {
		console.log(comments);
		let result = [];

		comments.map((comment, idx) => {
			result.push(
				<CommentContainer key={idx} comment={comment}/>
			)
		})

		return result;
	}


	const buttons = [
		<Button aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: createComment ? theme.palette.primary.main : theme.palette.grey['700'] }} onClick={() => setCreateComment(!createComment)}>
			<ChatBubbleOutlineIcon sx={{ marginRight: '.25rem' }} fontSize='medium' />
			{post.comments.length}
		</Button>,
		<RepostButton handleRepost={handleRepost} reposts={reposts} isReposted={isReposted} setIsReposted={setIsReposted} post={post} user_id={user_id} />,
		<Button aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: isLiked ? theme.palette.primary.main : theme.palette.grey['700'] }} onClick={handleLike} >
			{isLiked ? <FavoriteIcon sx={{ marginRight: '.25rem' }} fontSize='medium' /> : <FavoriteBorderIcon sx={{ marginRight: '.25rem' }} />}
			{postLikes}
		</Button>,
	];

	return (
		<Grid item xs={6}>
			<Paper elevation={2}>
				<Typography variant='h6' className='section-heading'>
					<IconButton sx={{ p: 0, m: 0, marginRight: 2 }} onClick={() => navigate('/home')}>
						<ArrowBackIcon />
					</IconButton>
					Post by username
				</Typography>
				<Box display='flex' flexDirection='column' justifyContent={'center'} padding={2} >
					{ isLoading ? 
						<Box height={150} display='flex' alignItems='center'>
							<CircularProgress/>
						</Box> :
						[<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'left', width: '100%' }} >
							<Avatar sx={{ marginRight: '.5rem', width: 50, height: 50 }}/>
							<Link underline='hover' onClick={() => navigate(`/user/${post.username}`)} >
								<Typography variant='subtitle1' sx={{fontFamily: theme.typography.bold}} >
									{post.username}
								</Typography>
							</Link>
						</Box>,
						<Typography variant='subtitle1' sx={{py: 2}}>
							{post.text}
						</Typography>,
						<Divider/>,
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
							{buttons}
						</Box>,
						<Divider/>,
						[
							createComment &&
							<Box sx={{py: 2}}>
								<CreateComment post={post}/>
							</Box>
						],
						displayComments(post.comments)
					]}
				</Box>
			</Paper>
		</Grid>
	)
}

export default PostShowPage;