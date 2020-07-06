/*

    What is Redux ?

        Redux is a 'State Management Library' for JavaScript applications. We can use this with React, Angular, Vue and even with vanilla JavaScript. A State Management Library is often required
        when in the application, we need the different parts of the UI in sync, like when we change data in some part of the UI and we want different part of the UI to be updated in order to
        reflect the changes. In more complex scenarios, data can be updated as a result of network requests or background tasks. In this situation, data can flow from one part of the UI to another
        and can change in unpredictable ways, figuring this might become a very difficult task. 'Facebook' encountered this problem and created a solution called 'Flux', Redux is inspired from 
        'Flux' and is more popular nowadays, another popular solution is 'MobX'. With Redux instead of scattering 'application state' in various parts of UI, we store all the application state in 
        a central repository called 'Store' which is a simple JavaScript object which creates only a 'single source of truth'. With this architecture, the different parts of the UI, no longer 
        maintain their own state, instead they get what they need from 'Store', which immediately solves the problem of synchronizing the data across the different parts of the UI. With Redux, 
        it also becomes easier to understand how the data changes in our application.


    Pros and Cons

        Some of the benefits of Redux are,

            >> Predictable State Changes

                Redux makes state changes predictable and transparent, we can easily see what exactly is going on and how the application state changes in response to every action

            >> Centralized State

                Redux centralizes the application state, so all the data our application needs is stored in a single place which is accessible by all parts of the UI.

            >> Easy Debugging

            >> Cache or Preserve page state 

            >> Implement Undo/Redo Features

            >> Large ecosystem of add-ons

        All the great features comes at a cost, 

            >> Complexity

                Redux introduces some complexity in our code since its based on 'Functional Programming' rather than 'Object Oriented Programming'

            >> Verbosity

                Redux code is very verbose, we often need to write some boilerplate code to get things done.

    
    Is Redux for You ? 
    
        If we are on a tight budget, or building a small to medium size application which has fairly simple UI and data flow, or the data doesn't change in the app and we simply fetch the api 
        on every page reload and render it statically, Redux might not be the best tool for us. Redux isn't required unless we are working with a very complex UI and includes heavy data flow that is
        rendered dynamically. We shouldn't start with redux from the beginning, we should start with the basic tools and if in between developing our application we see the need of Redux, we can 
        then add it later.


    

    


















*/
