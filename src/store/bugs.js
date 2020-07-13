import { createSlice } from '@reduxjs/toolkit';

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
	},
});

export default slice.reducer;

export const { bugAdded, bugResolved, bugRemoved } = slice.actions;
