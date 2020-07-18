import reducer from './reducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from './middleware/logger';
import { toast } from './middleware/error';
import api from './middleware/api';

export default function () {
	return configureStore({
		reducer,
		middleware: [
			...getDefaultMiddleware(),
			logger('logging to console...'),
			toast,
			api,
		],
	});
}
