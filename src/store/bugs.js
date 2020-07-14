import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
	name: 'bugs',
	initialState: [],
	reducers: {
		bugAdded: (bugs, action) => {
			bugs.push({
				id: ++lastId,
				description: action.payload.description,
				isResolved: false,
			});
		},
		bugResolved: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.id);
			bugs[index].isResolved = true;
		},
		bugRemoved: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.id);
			bugs.splice(index, 1);
		},
		bugAssignedToUser: (bugs, action) => {
			const { bugId, userId } = action.payload;
			const index = bugs.findIndex(bug => bug.id === bugId);
			console.log(index);
			bugs[index].userId = userId;
		},
	},
});

export default slice.reducer;

export const {
	bugAdded,
	bugResolved,
	bugRemoved,
	bugAssignedToUser,
} = slice.actions;

export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs,
	bugs => bugs.filter(bug => !bug.isResolved)
);

export const getBugsByUser = userId =>
	createSelector(
		state => state.entities.bugs,
		bugs => bugs.filter(bug => bug.userId === userId)
	);
