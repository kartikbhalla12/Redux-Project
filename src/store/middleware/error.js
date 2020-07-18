export const toast = store => next => action => {
	if (action.type === 'error') console.log(`TOAST: ${action.payload.message}`);
	else next(action);
};
