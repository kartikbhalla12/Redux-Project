import axios from 'axios';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';

const baseURL = 'http://localhost:9001/api';

const api = ({ dispatch, getState }) => next => async action => {
	if (action.type !== apiCallBegan.type) next(action);
	else {
		const {
			url,
			method = 'get',
			data,
			onStart,
			onSuccess,
			onError,
		} = action.payload;

		if (onStart) dispatch({ type: onStart });
		next(action);

		try {
			const res = await axios[method](`${baseURL}/${url}`, data);
			dispatch(apiCallSuccess(res.data));
			if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
		} catch (error) {
			dispatch(apiCallFailed({ error: error.message }));
			if (onError) dispatch({ type: onError, payload: error.message });
		}
	}
};

export default api;
