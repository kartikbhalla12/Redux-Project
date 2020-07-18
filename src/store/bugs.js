import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
	name: 'bugs',
	initialState: {
		list: [],
		loading: false,
		lastFetched: null,
	},
	reducers: {
		bugAdded: (bugs, action) => {
			bugs.list.push(action.payload);
		},
		bugResolved: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			bugs.list[index].isResolved = true;
		},
		bugRemoved: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			bugs.list.splice(index, 1);
		},
		bugAssignedToUser: (bugs, action) => {
			const { id, userId } = action.payload;
			const index = bugs.list.findIndex(bug => bug.id === id);
			bugs.list[index].userId = userId;
		},

		bugsRequested: (bugs, action) => {
			bugs.loading = true;
		},
		bugsReceived: (bugs, action) => {
			bugs.list = action.payload;
			bugs.loading = false;
			bugs.lastFetched = Date.now();
		},
		bugRequestFailed: (bugs, action) => {
			bugs.loading = false;
		},
	},
});

export default slice.reducer;
export const { bugsRequested, bugsReceived, bugRequestFailed } = slice.actions;

//ActionCreators

const url = 'bugs';
const { bugAdded, bugRemoved, bugResolved, bugAssignedToUser } = slice.actions;

export const loadBugs = () => (dispatch, getState) => {
	const { lastFetched } = getState().entities.bugs;
	const diff = moment().diff(moment(lastFetched), 'minutes');

	if (diff < 10) return;

	dispatch(
		apiCallBegan({
			url,
			// method: 'get',
			onSuccess: bugsReceived.type,
			onStart: bugsRequested.type,
			onError: bugRequestFailed.type,
		})
	);
};
export const addBug = bug =>
	apiCallBegan({
		url,
		data: bug,
		method: 'post',
		onSuccess: bugAdded.type,
	});

export const resolveBug = id =>
	apiCallBegan({
		url: `${url}/${id}`,
		method: 'patch',
		data: { resolved: true },
		onSuccess: bugResolved.type,
	});

export const assignBugToUser = (id, userId) =>
	apiCallBegan({
		url: `${url}/${id}`,
		method: 'patch',
		data: { userId },
		onSuccess: bugAssignedToUser.type,
	});

// Selectors

export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs,
	bugs => bugs.list.filter(bug => !bug.isResolved)
);

export const getBugsByUser = userId =>
	createSelector(
		state => state.entities.bugs,
		bugs => bugs.list.filter(bug => bug.userId === userId)
	);
