# ES2015
JavaScript is going through some interesting changes right now. New methods, different ways of doing old things. In this guide, you'll learn about some of those changes, and why they're awesome. You can't run a lot of these in your browser yet, since they're still trying to implement them. Checkout [this](kangax.github.io/compat-table/es6) to see when your favorite browser will be getting these features baked in. In the mean time, we'll use a [transpiler](https://babeljs.io/). If you want to play along run this:

```
npm install -g babel-cli
npm install babel-preset-es2015
```
Put this in a file named `.babelrc`
```
{ "presets": ["es2015"] }
```

Then run:
```
babel <my-file.js> -o output.js
node output.js
```

`output.js` will hold the transpiled file. It will look terrible. You've been warned.

We won't have to do any of this business for the labs. It's all taken care of for you.

## `=>` and Lexical `this`

Have you ever seen some code like this, and been confused?

``` javascript
  var steven = {
    name: "Steven",
    friends: ["Jeff", "Josh", "Joe"],
    displayFriends: function(){
      console.log("Listing friends for " + this.name);
      this.friends.forEach(function(friend){
        console.log(friend + " is friends with " + this.name);
      })
    }
  }
  steven.displayFriends();
//   Listing friends for Steven
//   Jeff is friends with
//   Josh is friends with
//   Joe is friends with
```

What gives?! It looks like `this` changed out from under us. What we're seeing here is dynamic scope. The meaning of `this` changes when it's inside of a function that isn't tied to an object. Our function being passed to `forEach` isn't tied to an object.

How do we fix this? We could do this:

``` javascript
var steven = {
  name: "Steven",
  friends: ["Jeff", "Josh", "Joe"],
  displayFriends: function(){
    console.log("Listing friends for " + this.name);
    var _that = this;
    this.friends.forEach(function(friend){
      console.log(friend + " is friends with " + _that.name);
    })
  }
}
steven.displayFriends();
```

This captures the current `this` before it changes. This works but ES2015 introduces a better way. Introducing the fat arrow `=>`.

With the `=>` we can change our code to look like this:

``` javascript
var steven = {
  name: "Steven",
  friends: ["Jeff", "Josh", "Joe"],
  displayFriends: function(){
    console.log("Listing friends for " + this.name);
    this.friends.forEach((friend) => {
      console.log(friend + " is friends with " + this.name);
    })
  }
}
steven.displayFriends();
```
SWEET! This changes the way `this` behaves. Instead of being a dynamic scope, it's now a __lexical__ scope. It makes it behave like would you would expect by looking at the text.


## Template strings
JavaScript sucks at multi-line strings. There, __I said it__. It also doesn't have string interpolation like ruby, forcing us to write terrible pieces of code like this one:

``` javascript
  console.log(friend + " is friends with " + this.name);
```

With template strings we can do both multi-line strings AND string interpolation. Take a look at this code:

```javascript
var name  = "Steven";
console.log(`${name} is an instructor at The Flatiron School.
  He likes Programming`);
```
WORKS! Using the \` backticks, we can create multi-line strings and by using `${}` we can interpolate values.

Our code can be updated to look like this:

```javascript
var steven = {
  name: "Steven",
  friends: ["Jeff", "Josh", "Joe"],
  displayFriends: function(){
    console.log("Listing friends for " + this.name);
    this.friends.forEach((friend) => {
      console.log(`${friend} is friends with ${this.name}`);
    })
  }
}
steven.displayFriends();
```

## Property functions
This is a great addition for me because I used to make this typo all the time! In an object, if the value for the property is function, you can write your function differently.

```javascript
var steven = {
  displayFriends: function(){
  }
}
```
vs
```javascript
var steven = {
  displayFriends(){
  }
}
```

Our updated example looks like this:
```javascript
var steven = {
  name: "Steven",
  friends: ["Jeff", "Josh", "Joe"],
  displayFriends(){
    console.log("Listing friends for " + this.name);
    this.friends.forEach((friend) => {
      console.log(`${friend} is friends with ${this.name}`);
    })
  }
}
steven.displayFriends();
```

Much nicer IMHO.

## Classes
In JavaScript, the way to model objects is to create a function, and add methods to its prototype like this:

```javascript
function Person(name, friends){
  this.name = name;
  this.friends = friends;
}

Person.prototype.displayFriends = function(){
  console.log("Listing friends for " + this.name);
  this.friends.forEach((friend) => {
      console.log(`${friend} is friends with ${this.name}`);
    })
}
var steven = new Person("Steven", ["Jeff", "Josh", "Joe"]);
steven.displayFriends();
```

ES2015 introduces another way, classes:

```javascript
class Person {
  constructor(name, friends) {
    this.name = name;
    this.friends = friends;
  }

  displayFriends() {
    console.log("Listing friends for " + this.name);
    this.friends.forEach(friend => {
      console.log(`${ friend } is friends with ${ this.name }`);
    });
  }
}
var steven = new Person("Steven", ["Jeff", "Josh", "Joe"]);
steven.displayFriends();
```

So nice! We define a `constructor` function with property function syntax. That's what gets called when we call `new Person`. It's like Ruby's `initialize` method. Any other function is an instance method. `prototype` be GONE!

## `let` and `const`: You didn't know you needed this, but you do

Take a look at this code:

```javascript
function sayHi(name){
  var response;
  if(name){
    var temp = `${name}!`;
    response = `${temp} how's it going?`;
  }else{
    var temp = `${name}!`;
    response = `${temp} how's it going?`;
  }
  console.log(temp);
  return response;
}
sayHi("Bob");
// prints Bob!
// returns "Bob! how's it going?"
```

We only want temp to be... well, temporary. Until now JavaScript had only one kind of variable: A function scoped variable. ES2015 introduces a block scoped variable with the `let` keyword. Any `{}` creates a scope gate.

```javascript
function sayHi(name){
  var response;
  if(name){
    let temp = `${name}!`;
    response = `${temp} how's it going?`;
  }else{
    let temp = `${name}!`;
    response = `${temp} how's it going?`;
  }
  console.log(temp);
  return response;
}
sayHi("Bob");
// ReferenceError: temp is not defined
```

WOOT!

`const` just makes a constant, A variable that can't be changed. It has the same scoping rules as `let`.

```javascript
const neverLetGo = "Jack";
neverLetGo = "Elsa";
// TypeError: Assignment to constant variable.
```

## modules
JavaScript loads everything globally unless you do stuff like use [`IIFE`s](http://benalman.com/news/2010/11/immediately-invoked-function-expression/). [This](http://c2.com/cgi/wiki?GlobalVariablesAreBad). [is](http://stackoverflow.com/a/10525602/1062960). [bad](http://programmers.stackexchange.com/a/148109). ES2015 introduces a new way to classes.

Modules work by `import`ing and `export`ing chunks of code. There are 2 types of exports: `default` and `everything else`. When importing, you can either give it specifically what you're looking for, or let it give you the default. Let's see them in action.

```javascript
// job.js
class Job{
  constructor(title){
    this.title = title;
  }
}

export var validJobs = ["programmer", "that's it"]
export default Job;
```

``` javascript
// person.js
import Job from './job.js'
import {validJobs} from './job.js'
class Person{
  constructor(name, job){
    this.name = name;
    this.job = job;
  }
};

var programmer = new Job("Programmer");
var bob = new Person("Bobby", programmer)
console.log(`validJobs are ${validJobs}`);
console.log(`${bob.name} is a ${bob.job.title}`);
```

`person.js` loads the `default` export as `Job`. This can be named anything. The non-default exports HAVE to use the name being exported and it has to be wrapped it the curly braces `{}`.


# Labs
There's nothing that FORCES you to use ES2015 syntax... but use it!
