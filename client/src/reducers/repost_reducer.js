import {
	FETCH_ALL_REPOSTS_SUCCESS,
	FETCH_ALL_REPOSTS_REQUEST,
	FETCH_ALL_REPOSTS_FAILURE,
} from '../actions/post_actions'

const initialState = {
	isLoading: false,
	error: null,
	reposts: []
}

const repostsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_REPOSTS_REQUEST:
			return { ...state, isLoading: true, error: null };
		case FETCH_ALL_REPOSTS_SUCCESS:
			return { ...state, 
				isLoading: false, 
				error: null, 
				reposts: [...state['reposts'], ...action.payload['reposts']], // Concatenate old and new posts
			};
		case FETCH_ALL_REPOSTS_FAILURE:
			return { ...state, isLoading: false, error: action.payload, reposts: null }
		default:
			return state;
	}
}

export default repostsReducer;