/*


    Redux Architecture

        With Redux, we store our application state within a single javascript object called 'Store'. This Store is the 'single source of truth' for our application state and is
        accessible throughout all parts of the UI. For eg, for an e-commerce website, our store will look something like this,

            {
                categories: [],
                products: [],
                cart: {},
                user: {},
            }

        What we have in store, redux has no opinion about it, we can use objects, arrays, numbers, boolean etc that can represent data. Since redux is built on top of function 
        programming principals, we can not directly modify or mutate the store. So to update it, we can create a function that takes the store object and returns an updated store
        object. We call these functions as 'Reducers' in redux, so in this function we either use the 'spread' operator or use the immutable libraries like 'immer' or 'immutable.js',

            function redux(store) {
                const updated = { ...store };
                return updated;
            }

        So a Reducer is essentially just a function, that takes the store object and returns the updated store. But in order to know what properties reducer has to update like, 
        'updated.cart' or 'updated.user', it needs another argument, what we call an 'action' which specifies what just happen, for eg, when a user logs in, added an item in the 
        cart. Based on the type of action, the reducer will know what properties of store to update,

            function redux(store, action) {
                
                // updates on basis of action
                const updated = { ...store };
                
                return updated;
            }

        This doesn't mean that all our actions has to be handled by one single reducer, we can have different reducers for updating the specific 'slice' of the store object. For eg,
        we have 4 slices in the store object, categories, products, cart, user. All the events( actions ) related to 'categories' will be handled by a different reducer and so on.

        Thus we have three building blocks in redux applications,

            >> Actions, which are plain JavaScript objects, that defines what just happened (events)

            >> Store, which is a single JavaScript object which includes our application state

            >> Reducer, which are responsible for updating a slice of the store ( event handlers )

        These reducers are pure functions, so these reducers don't touch global state, doesn't mutate any object and thus doesn't have any side effects. We don't work with the 
        reducers directly, rather when we perform an action, we create an action object and dispatch it using the 'dispatch' method on the store object, it will then forward 
        this action to the reducer internally, which returns a new updated store. The store then sets the new state internally and notifies all the UI components to re-render

        This dispatch action is like an entry point to our store, so by dispatching actions, we are sending all actions by the same entry point, which enables us to implement 
        features like logging of every actions, undo-redo mechanisms.


    Our First Redux Application

        So, we will build a bug tracker app using redux, on the UI we will have a 'text box 'to add the info about the bug we just discovered. We can add this bug to the list,
        remove the bug, mark it as resolved, and can change its status to in-progress and so on.

        The four steps we need to follow while building the redux applications are

            >> Design the Store, we need to decide what all we want to keep in the store

            >> Define the actions, we need to see what all actions that can a user perform in this application

            >> Create a reducers, we need to create one or more reducers to take the state and return the updated state

            >> Set up Store, we need to set up our store based on the reducers.

        Before we get started, we need to install redux into our application,

            npm i redux

    
    Designing the Store

        The first step in building the redux application is designing the store, we need to see what all we need to keep inside our store. So for our bug tracker application, the
        simplest implementation that we can come up is an 'array of bugs' in which every bug has properties like id, description and isResolved,

            [
                {
                    id: 1,
                    description: "",
                    isResolved: false
                },
                { ... },
                { ... },
            ]

        Now in more real-life application, our store will look something below with a property called 'bugs' which will be an array and another property called 'currentUser' which 
        keeps record of the current user,
            
            {
                bugs: [
                    {
                        id: 1,
                        description: ""
                        isResolved: false,
                    },
                    { ... },
                    { ... },
                ],

                currentUser: {},
            };

        Since this has two slices we would need two different reducers as well. We will stick to the simpler approach as of now to understand redux easily,
            
            [
                {
                    id: 1,
                    description: "",
                    isResolved: false
                },
                { ... },
                { ... },
            ]      

        As our application develops, we can refractor our code and turn this store to the above complex state.


    Defining the Actions

        Now the second step is defining the actions, we need to decide what all actions can a user perform with the our bug tracker app, they can be,

            >> Add a bug,

            >> Mark a bug as resolved,

            >> Delete a bug
        
        In real-life we might have more actions like status of the bug, progress, filtering bugs etc. As of now, we will focus on these three actions.

        An action is just a plain JavaScript object that defines what just happened, for eg,

            {
                type: "ADD_BUG",
                description: "..."
            }

        'type' is the only property that redux expects inside an action object and thus will complain if its not present, and this can be any serializable type which 
        means that can be stored under disk. We can also use numbers, but they are not descriptive. Using strings makes it lot easier while debugging in redux dev tools.

        String like 'ADD_BUG' is a common convention in redux with all letters capital and spaced with '_'. However actions determine events which have already occurred and thus we
        should prefer pastTense, and since we are using JavaScript, we can also use the camel case,

            {
                type: "bugAdded",
                description: "...",
                dateOccurred: "...",
                ...
            }

        Now, here we have another property which is description, for eg, when a user adds a bug, the description of the data is stored inside it. A better way to define our 
        description property is to use inside an object which gives a better structure,

            {
                type: "bugAdded",
                payload: {
                    description: "...",
                    dateOccurred: "...",
                    ...
                }
                
            }        

        Let's take another example, suppose when a user wants to remove a bug, we can have an action like,

            {
                type: "bugRemoved",
                payload: {
                    id: 1
                }
            }

        The payload should contain minimum information that is required to identify an action. While removing a bug we do not need to store the information about the bug, like its
        description, date it occurred and so on. All we need to identify a bug is its 'id'.
        
    
    Creating a Reducer

        A reducer is a function with two parameters, the current 'state' and the 'action'. The job of this reducer is to return a new state based on this action. for eg,

            function reducer(state, action) {
                if(action.type === 'bugAdded') {
                    ...
                }
            }
        Let's create a file called 'reducers.js'. Since we are using an array as our store, we need to copy it using the 'spread' operator first or using any immutable libraries 
        and then we need to add our new bug and then return this array. For our 'id', we can declare a global variable and increase it at every call,

            let lastId = 0;
            
            function reducer(state, action) {
                if(action.type === 'bugAdded') {
                    return [
                        ...state,
                        {
                            id: ++lastId,
                            description: action.payload.description,
                            isResolved: false,
                        },
                    ];
                }
            }

        Note that the payload of the action should contain the minimum information that is required to update our state, So in case of adding a bug, we don't wanna pass the 'id',
        or the 'isResolved' property from the action, everything else can be computed here inside the reducer.

        Now for removing a bug, we can do something like,

            let lastId = 0;
            
            function reducer(state, action) {
                if(action.type === 'bugAdded') {
                    return [
                        ...state,
                        {
                            id: ++lastId,
                            description: action.payload.description,
                            isResolved: false,
                        },
                    ];
                }
                else if(action.type === 'bugRemoved') {
                    return state.filter(bug => bug.id !== action.payload.id) 
                }
            }    

        What if our action matches none of this, then our reducer will simply not return anything, we don't want to do that, thus we need to have an else statement that simply 
        returns the state,

            let lastId = 0;

            function reducer(state, action) {
                if (action.type === 'bugAdded') {
                    return [
                        ...state,
                        {
                            id: ++lastId,
                            description: action.payload.description,
                            isResolved: false,
                        },
                    ];
                } else if (action.type === 'bugRemoved') {
                    return state.filter(bug => bug.id !== action.payload.id);
                } else return state;
            }

        We can also implement this using the Switch case like,

            let lastId = 0;

            function reducer(state, action) {
                switch (action.type) {
                    case 'bugAdded':
                        return [
                            ...state,
                            {
                                id: ++lastId,
                                description: action.payload.description,
                                isResolved: false,
                            },
                        ];
                    case 'bugRemoved': {
                        return state.filter(bug => bug.id !== action.payload.id);
                    }
                    default:
                        return state;
                }
            }

        So when we start our application, our store is 'undefined', so when it calls our reducer and gives 'state' as 'undefined' as the argument, we don't want to return 
        'undefined', so we can set the default state as,

            let lastId = 0;

            function reducer(state = [], action) {
                ...
            }

        Note that this reducer is a pure function and is not mutating any object and returns the same result with same arguments everytime. In Redux reducers have to be pure 
        functions, so that they can either be cached or run simultaneously. Atlast we need to export this reducer to be used in different files,

            let lastId = 0;

            export default function reducer(state = [] , action) {
                switch (action.type) {
                    case 'bugAdded':
                        return [
                            ...state,
                            {
                                id: ++lastId,
                                description: action.payload.description,
                                isResolved: false,
                            },
                        ];
                    case 'bugRemoved': {
                        return state.filter(bug => bug.id !== action.payload.id);
                    }
                    default:
                        return state;
                }
            }   


        
    Creating the Store

        Now that we have our reducer in 'reducers.js', we can create a new file called 'store.js' and import this reducer in it,

            import reducer from './path/to/reducers.js'

        Also we need the 'createStore' function from the redux,
            
            import { createStore } from 'redux'

        Now we can use the createStore function and pass our reducer as the argument, this returns a store object which we can export from our file,

            const store = createStore(reducer)

            export default store


    Dispatching Actions
    
        Now in 'index.js', we should import the store from the 'store' module and let's log it on the console,

            import store from './path/to/store.js'

            console.log(store)

        On logging we can see that this object has bunch of methods,

            {
                dispatch: ƒ dispatch(action)
                getState: ƒ getState()
                replaceReducer: ƒ replaceReducer(nextReducer)
                subscribe: ƒ subscribe(listener)
                Symbol(observable): ƒ observable()
                __proto__: Object
            }

        We have a method called 'dispatch' for dispatching actions, a method called 'subscribe' for subscribing to the store, so whenever our state of the store is changed, we 
        will get notified, we also have a method 'getState' to get the store object. We don't have any method to set the state of the 'Store' object. So to change the state 
        of the store, we have to dispatch actions, which allows us to use features like logging and undo-redo. Now we can see the state of our Store using 'getState',

            console.log(store.getState()) >> []

        So if had not defined the default state of the object, we would have gotten 'undefined'. Let's dispatch an action using the 'dispatch' method, it takes the action object,

            store.dispatch({
                type: 'bugAdded',
                payload: {
                    description: 'Bug1'
                }
            })

        Now we can log it on the console,

            console.log(store.getState()) >> [{ id: 1, description: "Bug1", isResolved: false }]

        Now we can dispatch an action for removing this bug,

            store.dispatch({
                type: 'bugRemoved',
                payload: {
                    id: 1
                }
            })

        and now if we log it, we should see an empty array,

            console.log(store.getState()) >> []


    Subscribing to the Store
            
        Before dispatching an action, we can call the subscribe method, which takes a function as an argument which is called whenever there is a change in the state of the Store,

            store.subscribe(() => console.log('Store Changed!', store.getState()))
        
        and we can see in our console,

            Store Changed! [{ id: 1, description: "Bug1", isResolved: false }]
            Store Changed! []

        'subscribe' method is used for refreshing the UI layer whenever the state of the store is changed, for eg, re-rendering in react.

        this 'subscribe' method returns a function for unsubscribing from the store. This is needed when we move away from the current page and in the new page we might not have 
        that UI element and thus would affect the memory, as it won't be visible to the user.
            
            const unsubscribe = store.subscribe(() => console.log('Store Changed!', store.getState()))

        and when we call the unsubscribe function, we will no longer be notified when the state changes, let's say we call it after dispatching 'bugAdded' action,

            unsubscribe()

        with this in the console we get,

            Store Changed! [{ id: 1, description: "Bug1", isResolved: false }]


    Action Types
            
        The problem we have in this code is that we hard-coded the string bugAdded and bugRemoved inside the 'index.j's and 'reducers.js', and if we ever want to rename this string,
        we have to do it in multiple places. So to solve this, we can define these strings in one file called actionTypes and export them from there,

            export const BUG_ADDED = 'bugAdded';
            export const BUG_REMOVED = 'bugRemoved';

        and we can use them in different files as

            import * as actions from './path/to/actionTypes.js';

        and now we can use these strings as actions.BUG_ADDED like,

            store.dispatch({
                type: actions.BUG_ADDED,
                ...
            });

        and in reducers.js like,

            export default function reducer(state = [], action) {
                switch (action.type) {
                    case actions.BUG_ADDED:
                        ...
                    case actions.BUG_REMOVED: 
                        ...
                }
            }

    
    Action Creators

        The other problem we have is, how we dispatch our actions,

            store.dispatch({
                type: actions.BUG_ADDED,
                payload: {
                    description: 'Bug1',
                },
            });

        As we can see for dispatching our actions, we have to type the entire structure of the object, this would be a lot repetitive if we have to dispatch this action at multiple
        places, for this we can create a function for each action in a file let's say actionCreators.js and export it from there. In this file we first need to import the 
        'actionType.js', 

            import * as actions from './path/to/actionTypes.js';

            export const bugAdded = description => ({
                type: actions.BUG_ADDED,
                payload: {
                    description,
                },
            })

        and similarly for bugRemoved,

            export const bugRemoved = id => ({
                type: actions.BUG_REMOVED,
                payload: {
                    id,
                },
            })

        and we can import them in our index.js using,

            import * as actionCreators from './path/to/actionCreators.js';

        Now, we can call these functions which returns an action object which we can use inside the 'dispatch' method,

            store.dispatch(actionCreators.bugAdded('Bug1'))
            
            store.dispatch(actionCreators.bugRemoved(1))
            


*/
