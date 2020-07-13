import configureStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';
import { projectAdded } from './store/projects';

const store = configureStore();
const unsubscribe = store.subscribe(() =>
	console.log('Store Changed!', store.getState())
);
store.dispatch(bugAdded({ description: 'Bug1' }));
store.dispatch(bugAdded({ description: 'Bug2' }));
store.dispatch(bugAdded({ description: 'Bug3' }));
store.dispatch(bugAdded({ description: 'Bug4' }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(bugRemoved({ id: 2 }));

store.dispatch(projectAdded({ name: 'Project 1' }));
