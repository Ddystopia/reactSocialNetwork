import { profileAPI } from "../api/api";

const ADD_POST = Symbol("ADD_POST");
const REMOVE_POST = Symbol("REMOVE_POST");
const SET_PROFILE_USER = Symbol("SET_PROFILE_USER");
const TOGGLE_IS_FETCHING = Symbol("TOGGLE_IS_FETCHING");
const SET_USER_STATUS = Symbol("SET_USER_STATUS");
const SET_PHOTO_SUCCESS = Symbol("SET_PHOTO_SUCCESS");

const initial = {
	postsData: [
		{
			id: 1,
			message: "My first Post!",
			likesCount: 0,
		},
		{
			id: 2,
			message: "I like dogs",
			likesCount: 0,
		},
		{
			id: 3,
			message: "Yesterday I ate delicious pasta",
			likesCount: 0,
		},
		{
			id: 4,
			message: "My best day",
			likesCount: 0,
		},
	],
	profile: null,
	isFetching: false,
	status: "",
};

const profileReducer = (state = initial, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				postsData: [
					...state.postsData,
					{
						id: state.postsData[state.postsData.length - 1].id + 1,
						message: action.message,
						likesCount: 0,
					},
				],
			};
		case REMOVE_POST:
			return {
				...state,
				postsData: state.postsData.filter((post) => post.id !== action.id),
			};
		case SET_PROFILE_USER:
			return { ...state, profile: action.profile };
		case SET_USER_STATUS:
			return { ...state, status: action.status };
		case SET_PHOTO_SUCCESS:
			return { ...state, profile: { ...state.profile, photos: action.photos } };
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		default:
			return state;
	}
};

const addPost = (message) => ({ type: ADD_POST, message });
const removePost = (id) => ({ type: REMOVE_POST, id });
const setProfileUser = (profile) => ({ type: SET_PROFILE_USER, profile });
const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
const setPhotoSuccess = (photos) => ({ type: SET_PHOTO_SUCCESS, photos });
const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});

const setProfile = (userId) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	const data = await profileAPI.getProfile(userId);
	dispatch(setProfileUser(data));
	dispatch(toggleIsFetching(false));
};

const getUserStatus = (userId) => async (dispatch) => {
	const data = await profileAPI.getUserStatus(userId);
	dispatch(setUserStatus(data));
};

const updateUserStatus = (status) => async (dispatch) => {
	const data = await profileAPI.setUserStatus(status);
	if (data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

const setPhoto = (photo) => async (dispatch) => {
	const response = await profileAPI.setPhoto(photo);
	if (response.resultCode === 0) {
		dispatch(setPhotoSuccess(response.data.photos));
	}
};

const setProfileData = (formData) => async (dispatch) => {
	const response = await profileAPI.setProfileData(formData);
	if (response.resultCode === 0) {
		dispatch(setProfile(formData.userId));
	} else return Promise.reject() 
};

export default profileReducer;
export {
	setProfile,
	getUserStatus,
	updateUserStatus,
	addPost,
	removePost,
	setProfileUser,
	setUserStatus,
	setPhoto,
	setProfileData,
};
