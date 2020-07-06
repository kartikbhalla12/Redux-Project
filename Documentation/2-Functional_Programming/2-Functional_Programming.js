/*

    Functional Programming

        Redux is based on functional programming principles, so it is important that we know all about functional programming before starting with Redux applications.

    
    What is Functional Programming ?

        Functional programming is one of many programming 'paradigms' or styles of programming. Other paradigms include 'Object Oriented Programming', 'Procedural Programming' 
        or 'Event Driven Programming'. Each of these paradigms has certain rules about how to structure the code to solve the given problem.

        Function Programming includes decomposing a problem into a bunch of small and re-usable functions that takes up an input and return a result. They don't mutate or change 
        data. With this structures, we can compose these functions to build more complex functions. These smaller functions are 

            >> more concise,

            >> easier to debug,

            >> easier to test and

            >> more scalable as we can run these small functions simultaneously ( multi threaded )

        There are some languages like 'Closure', 'Haskell' which uses functional programming as a paradigm. JavaScript is a multi-paradigm language, it's not a pure functional
        programming language and has its own limitations. However we can still apply functional programming principles in JavaScript.


    Functions as First-Class Citizens

        In JavaScript, Functions are first-class citizens, which means we can treat them just like any other variables. With functions we can,

            >> assign them to a variable,

            >> pass them as an argument and

            >> return them from another functions

        Let's declare a function 'sayHello',

            function sayHello() {
                return "Hello World !"
            }

        We can assign this function to a variable simply by,

            let anotherFunction = sayHello

        Note that, we are not calling the 'SayHello' function since it will then return the string and 'anotherFunction' will a string instead of a function. 
        
        We can also pass functions as an argument like and call it inside another function

            function greet(fnMessage) {
                console.log(fnMessage())
            }

            greet(sayHello)

        We can also return functions inside another functions like,

            function sayHello() {
                return () =>  'Hello World !'
            }

        This returns an anonymous function which we can store into another variable and later call it
        
            const fn = sayHello()
            console.log(fn())


    Higher Order Functions

        Higher Order Functions are those functions that either takes a function as an argument or return a function or both. Some of the examples of higher order functions are
        the 'map', 'filter', 'setTimeout' etc. In all these functions or methods we pass a function as an argument like,

            const arr = [1,2,3,4]
            arr.map(e => e*2)
            
            setTimeout(()=> { console.log("hello") }, 2000)


    Function Composition

        Let's say we have a variable 'input',

            let input = '    JavaScript    '

        Our aim is to get this input string, trim it and wrap it inside div element, we can do this by,

            let output = `<div>${input.trim()}</div>`

        The above approach is a non-functional style of code. In Functional Programming, we can decompose this in bunch of functions like,

            const trim = str => str.trim()
            const wrapInDiv = str => `<div>${str}</div>`

        Now all we have to do is to give them the input, since the output of 'trim' function is needed to be given to 'wrapInDiv' function,

            const output = wrapInDiv(trim(input))

        This is what we call as 'Function Composition'. With this we can add more functions and pass them in this function call,

            const toLowerCase = str => str.toLowerCase()

            const output = wrapInDiv(toLowerCase(trim(input)))

        We have couple of problems here, first is that we have to read the above code from right to left instead of the traditional way. The other problem is with these 
        parentheses. As we use more and more functions, we will end up with bunch of parentheses.

    
    Composing and Piping

        To solve above two issues, we can use 'lodash', it a popular library built on top of 'underscore'. We can install this by,

            npm i lodash

        We only need to use 'compose' and 'pipe' functions, which are declared in sub package 'lodash/fp' which stands for 'functional programming' and then we can import in our 
        file using object destructuring,

            import { compose, pipe } from 'lodash/fp'

        With the 'compose' function, we can get rid of the parentheses. It takes all the functions as arguments and returns a function composed from all these smaller functions,

            let transform = compose(wrapInDiv, toLowerCase, trim)

        now, we can call this 'transform' function with the given input,
        
            let output = transform(input)
        
        'compose' is also an example of a higher order function as it takes functions as arguments. But once again, the first problem isn't solved yet, that is we still have to 
        read the code from right to left. To solve this, we can use the 'pipe' method instead of the 'compose' method.With the 'pipe' method, we can pass all the functions in 
        order we want to apply them,

            let transform = pipe(trim, toLowerCase, wrapInDiv)
            let output = transform(input)

        
    Currying

        Let's say we want a function that wraps a string with span element,

            const wrapInSpan = str => `<span>${str}</span>`

        However this function is quite similar to the wrapInDiv function,

            const wrapInDiv = str => `<div>${str}</div>`

        This has created duplication and it would be better if we have a function that takes the type of element as well,

            const wrap = (type, str) => `<${type}>${str}</${type}>`

        and now we can use this with the pipe method,

            let transform = pipe(trim, toLowerCase, wrap)
            let output = transform(input)

            console.log(output)

        However we get something unusual,

            <javascript>undefined</javascript>

        Since the way pipe works is, it takes output from one function and uses it as input for second function, our 'wrap' function has two arguments, 'type' and 'str',
        the output in the pipe function after toLowerCase is 'javascript', which is then given as argument to the 'wrap' function. Since the first argument is 'type', 
        it is assigned to 'javascript' and 'str' is left 'undefined'. Now, what if we call 'wrap' function with the 'div' as the first argument,

            let transform = pipe(trim, toLowerCase, wrap('div'))
            let output = transform(input)

            console.log(output)

        With this we will get another error which is 'Expected a function'. In the 'pipe' method, functions are given as arguments which are called internally, we can't call them
        before. the wrap('div') function returns a string (with str undefined in this case) which can't be given as an argument to the pipe function.

        Currying solve this problem in a very unique way, let's say we have a function called 'add' which takes two argument, 'a' and 'b',

            function add(a, b) {
                return a + b
            }
        
        Currying is a technique that allows us to take a function that has N arguments and covert it into a function that has single argument. So what we can do is remove the second
        argument that is 'b', and return another function that takes b as argument and then return a + b,

            function add(a) {
                return function(b) {
                    return a + b
                }
            }

        With this when we call the 'add' function we get a function in return which we can call with the second argument,

            const add1 = add(1)
            const result = add1(2)
            
            console.log(result) >> 3

        Or we can simply do,

            const result = add(1)(2)
            
            console.log(result) >> 3

        So with currying, instead of separating our arguments with commas, we separate them with parentheses. We can further simplify this using arrow functions,

            const add = a => b => a + b
            
            const result = add(1)(2)
            console.log(result) >> 3

        With currying, we created a function that takes only one argument at a time, this can really be helpful for the 'pipe' function, so let's apply currying to the 'wrap' 
        function,

            const wrap = type => str => return `<${type}>${str}</${type}>`

        With this, we can give the 'type' of the element and it will return a function which the 'pipe' method can call internally,

            let transform = pipe(trim, toLowerCase, wrap('div'))
            let output = transform(input)

            console.log(output)

        since 'wrap('div')' return a function with type defined already, 'pipe' can pass the string and thus we get the result as,

            <div>javascript<div>

    
    Pure Functions

        A function is said to be a Pure Function, when everytime we call a function with same arguments, we get the same results, for eg,

            function firstFunction(num) {
                return num * 2
            }

            console.log(firstFunction(2)) >> 4

        Some examples of Impure functions are,

            function secondFunction(num) {
                return num * Math.random()
            }

        The result of 'secondFunction' varies every time we call it since it uses the 'random' method, whereas in 'firstFunction' the result will be the same everytime we call 
        with a certain number. So in Pure Functions, we can't

            >> use random values,

            >> use current date and time,

            >> read or change global state like DOM elements, files, database etc,

            >> mutate parameters as it will change the result of the function

        In redux, we have special functions called 'reducers', while building redux applications, we have to make sure that our 'reducers' are pure. Other functions can be impure.
        Let's take another example,

            let minAge = 18

            function isEligible(age) {
                return age > minAge
            }

        So this function takes the age of a person and compares it to the 'minAge'. However 'minAge' is not defined inside the function and declared globally and our result can 
        vary if the minAge changes, thus this function is not a pure function. We can make it pure my taking the minAge from the user itself,

            function isEligible( age, minAge ) {
                return age > minAge
            }

        Some of the benefits of using the Pure Functions are,

            >> these functions are self-documenting, everything a function needs is clearly specified in its parameters

            >> this makes these functions easier to test as we don't need to set any global state prior to testing this functions,

            >> since we don't use or change global state, we can use these functions parallelly

            >> these functions are cacheable, this means we can store the result of this function so that we can directly use the result instead of calling the function with 
            same argument

    
    Immutability

        With Functional Programming, we follow the principle of 'immutability'. This means, once we create an object, we can't change it or mutate it. If we want to change an 
        object, we have to take the copy of that object and change that object. In most languages including JavaScript, 'Strings' are immutable, that means we can't mutate 
        existing string, all the methods on the string like toUpperCase return a new string. In contrast Objects in JavaScript are mutable, we can add or delete properties 
        from the same object, that's why JavaScript is not a pure function programming language. We can still apply functional programming principles in JavaScript.
        
        Some of the benefits of using Immutability are

            >> predictability, with immutability the object passed to a function won't get changed and thus is more predictable

            >> faster change detection, in react applications, as soon as state is changed, it triggers re-rendering. For it to know that state is changed, it compares the object's
            properties one by one since objects are mutable (at same location). With immutability, it re-renders as soon as it knows an object is changed as it is now at different
            location ( immutable ).

            >> concurrency, if we know that function doesn't mutate data, we can run these functions parallelly.

        There are some cons to it as well,

            >> There is performance hit to the application, as it needs to copy all the properties from one object to another. However this will only be an issue if we are dealing 
            with large number of objects

            >> It leads to Memory Overhead, as it creates new objects in memory everytime it has to change something, but we have certain libraries that reduce this a lot. They use
            a technique called structural sharing, which means if some properties are common between two objects, they are not copied and rather shared across them.

        
    Updating Objects

        Let's say we have a 'person' object with 'name' property,

            const person = { name: 'Kartik' }

        Now if we want to update the name, we are not supposed to change it using 'person.name' directly, rather we need to make a copy of this object first. We can do this using 
        two methods

            >> using 'Object.assign()' which takes an empty object as first argument and the 'person' object as the second argument. This method essentially copies all the 
            properties from the person method to the empty object and it returns that object. we can also pass multiple object from where the properties are to be copied,

                const updated = Object.assign( {}, person, { name: "John", age: 25 }) 
                console.log(person, updated)

            Since the object containing name of 'John' is passed after the 'person' object, it will overwrite the existing name and if we log both on the console,

                { name: 'Kartik' }, { name: 'John', age: 25 }

            We can clearly see that our original object is not changed.

            >> using the 'spread' operator, we can copy all the properties of an object using this operator which was introduced in ES6,

                const updated = { ...person, name: 'John', age: 25 }
                console.log(person, updated)

            any of the existing properties from the person object will be overwritten with the new one provided alongside.

        Note that both these methods do a shallow copy of the objects and we have to be careful while working with the nested objects. for eg we have a person object with his/her
        address,
            
            const person = {
                name: 'Kartik',
                address: { country: 'India', state: 'Delhi' },
            };

        Now if we copy this object to another object,

            const updated = { ...person, name: 'John'}

        We will see that the new object 'updated', will have all the properties from person and the updated name. But what if we try to change the country of the updated object,

            updated.address.country = "America"
            
            console.log(person, updated)

        and now on logging both the objects,

            { address: { country: "America", state: "Delhi" }, name: "Kartik" }
            { address: { country: "America", state: "Delhi" }, name: "John" }

        We can see that the 'country' property of both the object is changed to 'America'. This is because the 'spread' operator as well as the 'Object.assign()' methods do a 
        shallow copy of objects. This means that the inner nested objects are not copied and rather directly passed as a reference. To fix this we have to overwrite this inner
        objects using the spread operator like,
            
            const updated = { 
                
                ...person, 
                name: 'John'
                address: { 
                    ...person.address, 
                    country: 'America' 
                }, 
            }

            console.log(person, updated)

        Now on the console we can see that only the updated object has the different country name.

            { address: { country: "India", state: "Delhi" }, name: "Kartik" }
            { address: { country: "America", state: "Delhi" }, name: "John" }


        So, when working with nested objects, we have to perform a deep copy. But this approach is little bit lengthy and will become even more verbose with more nesting and thus 
        we use custom libraries specifically made for immutability.


    Updating Arrays

        Let's say we have an array,

            const numbers = [1,2,3]

        In order to apply immutability for adding an element, we can use the spread operator again to copy all the elements of the array to another array,

            const added = [ ...numbers, 4 ]
    
        To add an element before these elements,

            const added = [ 0, ...numbers]

        To add an element somewhere between, say after 2,

            const index = numbers.indexOf(2)
            const added = [...numbers.slice( 0, index + 1 ), 5, ...numbers.slice(index + 1)]

            console.log(added) >>  [1, 2, 5, 3]

        To delete an element from the array, we can use the 'filter' method which returns a new array. Suppose we want to remove the element 2,

            const removed = numbers.filter( num => num !== 2 )

            console.log(removed) >> [1, 3]

        To update an element of the array, we can use the 'map' method which also return a new array. Suppose we want to update the element 3,

            const updated = numbers.map( num => num !== 3 ? num : 5 )

            console.log(updated) >>  [1, 2, 5]


    Enforcing Immutability

        JavaScript doesn't prevent object mutations. To work around this, we have to use libraries that offer real immutable data structures. The most popular libraries are

            >> Immutable.js

            >> Immer

            >> Mori


    Immutable.js

        let's say we have a 'book' object,

            let book = { title: 'Harry Potter' }

        and we have a function 'publish' that updates the object,

            function publish( book ) {
                book.isPublished = true
            }

            publish(book)
            console.log(book)

        However when practicing functional programming, we don't want to mutate objects, so we can use libraries like 'Immutable.js' which provides bunch of immutable data 
        structures, so instead of using plain JavaScript objects, we can use these data structures provided by this library. We can install it by,

            npm i immutable

        Now we can import the Map function from this library, 
        
            import { Map } from 'immutable'

        'Map' function creates a 'Map' or a 'HashMap' which is a regular JavaScript object, but it is immutable. So instead of using plain JS object for 'book', we can call the Map 
        function and pass the object with required key-value pairs,

            let book = Map({title: 'Harry Potter'})

            console.log(book)

        When we log this on console, we can see that this object has bunch of different properties and methods which are different from plain JS objects,

            {
                size: 1, 
                _root: ArrayMapNode { ownerID: OwnerID, entries: Array(1) }, 
                __ownerID: undefined, 
                __hash: undefined, 
                __altered: false
            }

        This is the first problem of immutable, if we want to log the title of the book, we can't log it using,

            console.log(book.title)  >>  undefined

        rather we have to use the get method on this book object to get the value,

            console.log(book.get('title'))  >>  Harry Potter

        With this we have to learn bunch of new methods, and it becomes hard to integrate this with other libraries which takes regular JavaScript objects. If we need to get the 
        regular JavaScript object, we have to use the toJS method everytime,

            console.log(book.toJS())  >>  { title: "Harry Potter" }

        Now, we can change our 'publish' method with these immutable data structures and use the set method,

            function publish( book ) {
                return book.set('isPublished', true)
            }

            book = publish(book)
            
            console.log(book.toJS())  >> { title: "Harry Potter", isPublished: true }

        As we can see, we have to use these getters and setters to use these data structures and thus immer is a better option as it uses the regular JS objects.


    Immer

        Immer is an alternative to Immutable.js and is easier to work with. We can install immer by

            npm i immer

        and import the 'produce' function in our file using,

            import { produce } from 'immer'

        We can use this 'produce' function to return a new updated object. It takes two arguments, first is the object that has to be copied and second is a function which takes a 
        parameter that specifies our mutations. In this function block, we can write our normal mutating code,

            function publish( book ) {   
                return produce(book, draftBook => {
                    draftBook.isPublished = true
                })
            }
            let updated = publish(book)
            
            console.log(book, updated)

        This seems to be mutable code but the 'book' object is left untouched and the 'produce' function returns a new object with the properties of book object along with the 
        properties specified in second function. We can see both the objects in console,

            { title: "Harry Potter" } 
            { title: "Harry Potter", isPublished: true }

        With Immer, we can work with regular JavaScript objects in an immutable way and thus we don't need any getters and setters to work with objects and thus we can simply call

            console.log(updated.isPublished) 
            
        to get the result

            
*/
