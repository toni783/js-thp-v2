/* CHALLENGE 1 */

function sayHowdy() {
  console.log("Howdy");
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log("Partnah");
}
// After thinking it through, uncomment the following line to check your guess!
testMe(); // what order should these log out? Howdy or Partnah first?

/*

A: first it will be the console.log("Partnah") and after that the setTimeout(sayHowdy, 0)
this is because we first run everything in our global execution context and after that we run the functions
in the callback queue. 

notice that here both  are web apis but the console.log has an special behavior that its a synchronous process so its run immediately and
thats why its not added to the  callback queue
*/
/* CHALLENGE 2 */

function delayedGreet() {
  setTimeout(() => {
    console.log("welcome");
  }, 3000);
}
// Uncomment the following line to check your work!
delayedGreet(); // should log (after 3 seconds): welcome

/* CHALLENGE 3 */

function helloGoodbye() {
  // ADD CODE HERE
  console.log("hello");
  setTimeout(() => {
    console.log("good bye");
  }, 2000);
}
// Uncomment the following line to check your work!
helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

/* CHALLENGE 4 */

function brokenRecord() {
  // ADD CODE HERE
  setInterval(() => {
    console.log("hi again");
  }, 1000);
}
// Uncomment the following line to check your work!
brokenRecord(); // should log (every second): hi again

/* CHALLENGE 5 */

function limitedRepeat() {
  // ADD CODE HERE
  const interval = setInterval(() => {
    console.log("hi again");
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
}
// Uncomment the following line to check your work!
limitedRepeat(); // should log (every second, for 5 seconds): hi for now

/* CHALLENGE 6 */

function everyXsecsForYsecs(func, interval, duration) {
  // ADD CODE HERE

  console.log({ func: func(), interval, duration });
  const myInterval = setInterval(() => {
    func();
  }, interval * 1000);

  setTimeout(() => {
    clearInterval(myInterval);
  }, duration * 1000);
}
// Uncomment the following lines to check your work!
function theEnd() {
  console.log("This is the end!");
}
everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!

/* CHALLENGE 7 */

function delayCounter(target, wait) {
  let count = 1;
  return () => {
    const myInterval = setInterval(() => {
      console.log(count++);
    }, wait);

    setTimeout(() => {
      clearInterval(myInterval);
    }, target * 1000);
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const countLogger = delayCounter(3, 1000);
countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3

/* CHALLENGE 8 */

function promised(val) {
  // ADD CODE HERE
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(val); // ¡Todo salió bien!
    }, 2000);
  });
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const createPromise = promised("wait for it...");
createPromise.then((val) => console.log(val));
// will log "wait for it..." to the console after 2 seconds

/* CHALLENGE 9 */

class SecondClock {
  callback;
  interval;
  totalTime = 0;
  constructor(cb) {
    // ADD CODE HERE
    this.callback = cb;
  }
  // ADD METHODS HERE

  start() {
    this.interval = setInterval(() => {
      this.totalTime += 1000;
      this.callback(this.totalTime);
    }, 1000);
  }

  reset() {
    clearInterval(this.interval);
  }
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const clock = new SecondClock((val) => {
  console.log(val);
});
console.log("Started Clock.");
clock.start();
setTimeout(() => {
  clock.reset();
  console.log("Stopped Clock after 6 seconds.");
}, 6000);

/* CHALLENGE 10 */

function debounce(callback, interval) {
  // ADD CODE HERE

  let called = false;

  return () => {
    if (!called) {
      called = true;
      return callback();
    } else {
      setTimeout(() => {
        called = false;
      }, interval);
    }
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
function giveHi() {
  return "hi";
}
const giveHiSometimes = debounce(giveHi, 3000);
console.log(giveHiSometimes()); // -> 'hi'
setTimeout(function () {
  console.log(giveHiSometimes());
}, 2000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 4000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 8000); // -> 'hi'

/*
what happens here is that the synchronous code is runned first, after that we start with a block of functions call that get added to the 
callback queue, notice that internally we have in the debounce function a call to the setTimeout that will get added to the callback queue too
so the order is the following :

setTimeout -> 2000 is called and added the callback queue
  -internally when 2 seconds pass we call the debounce function, this function will execute the code and 
  the internal timeout will get added after 2 seconds has passed meaning that the timeout starts at ~ 2.01 ms, so this
  one will return a value at 2 + 3(interval) seconds. That's why the second timeout doesn't have any value but the 
  thrid one does 
*/
