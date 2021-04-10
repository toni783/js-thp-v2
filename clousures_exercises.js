// CHALLENGE 1
function createFunction() {
  const message = "hello";

  return () => console.log(message);
}

// /*** Uncomment these to check your work! ***/
const function1 = createFunction();
function1(); // => should console.log('hello');

// CHALLENGE 2
function createFunctionPrinter(input) {
  return () => console.log(input);
}

// /*** Uncomment these to check your work! ***/
const printSample = createFunctionPrinter("sample");
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter("hello");
printHello(); // => should console.log('hello');

// CHALLENGE 3
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log("counter", counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// /*** Uncomment these to check your work! ***/
willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x) {
  const valueToAdd = x;

  (val) => console.log(val + x);

  return (val) => val + x;
}

// /*** Uncomment these to check your work! ***/
const addByTwo = addByX(2);
addByTwo(1); // => should return 3
addByTwo(2); // => should return 4
addByTwo(3); // => should return 5

const addByThree = addByX(3);
addByThree(1); // => should return 4
addByThree(2); // => should return 5

const addByFour = addByX(4);
addByFour(4); // => should return 8
addByFour(5); // => should return 9

// CHALLENGE 4
function once(func) {
  let once = false;
  let result = null;

  return function onlyOnce(arg) {
    if (!result) {
      once = true;
      result = func(arg);
      return result;
    } else {
      return result;
    }
  };
}

// /*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo);
console.log(onceFunc(4)); // => should log 6
console.log(onceFunc(10)); // => should log 6
console.log(onceFunc(9001)); // => should log 6

// CHALLENGE 5
function after(count, func) {
  let counter = count;

  return function returnByCalls() {
    if (counter > 1) {
      counter--;
    } else {
      return func;
    }
  };
}

// /*** Uncomment these to check your work! ***/
const called = function () {
  console.log("hello");
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

// CHALLENGE 6
function delay(func, wait) {
  return () => {
    setTimeout(func, wait);
  };
}

const delayedFunc = delay(called, 1000);

delayedFunc();

// CHALLENGE 7
function rollCall(names) {
  const namesArray = names;
  let index = 0;

  return function loggedNames() {
    const result = namesArray[index];
    index++;

    if (result) {
      return result;
    } else {
      return "Everyone accounted for";
    }
  };
}

// /*** Uncomment these to check your work! ***/
const rollCaller = rollCall(["Victoria", "Juan", "Ruth"]);
rollCaller(); // => should log 'Victoria'
rollCaller(); // => should log 'Juan'
rollCaller(); // => should log 'Ruth'
rollCaller(); // => should log 'Everyone accounted for'

// CHALLENGE 8
function saveOutput(func, magicWord) {
  const mytotal = {};
  return (arg) => {
    if (arg === magicWord) {
      return mytotal;
    } else {
      mytotal[arg] = func(arg);
      return func(arg);
    }
  };
}

// /*** Uncomment these to check your work! ***/
const multiplyBy2 = function (num) {
  return num * 2;
};
const multBy2AndLog = saveOutput(multiplyBy2, "boo");
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(multBy2AndLog("boo")); // => should log { 2: 4, 9: 18 }

// CHALLENGE 9
function cycleIterator(array) {
  const copyArray = [...array];
  let returnedValueArray = [...copyArray];
  return () => {
    let result = returnedValueArray.shift();
    if (!result) {
      returnedValueArray = [...copyArray];
      result = returnedValueArray.shift();
    }
    return result;
  };
}

// /*** Uncomment these to check your work! ***/
const threeDayWeekend = ["Fri", "Sat", "Sun"];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

// CHALLENGE 10
function defineFirstArg(func, arg1) {
  return (arg2) => {
    return func(arg1, arg2);
  };
}

// /*** Uncomment these to check your work! ***/
const subtract = function (big, small) {
  return big - small;
};
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

// CHALLENGE 11
function dateStamp(func) {
  const result = {};
  return (...args) => {
    result.date = new Date();
    result.output = func(...args);
    return result;
  };
}

// /*** Uncomment these to check your work! ***/
const stampedMultBy2 = dateStamp((n) => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }
// using N arguments
const stampedMultBy2 = dateStamp((n, i) => n * i * 2);
console.log(stampedMultBy2(4, 2)); // => should log { date: (today's date), output: 16 }
console.log(stampedMultBy2(6, 2)); // => should log { date: (today's date), output: 24 }

// CHALLENGE 12
function censor() {
  const dictionary = {};
  return (...args) => {
    if (args.length > 1) {
      dictionary[args[0].toLowerCase()] = args[1];
    } else {
      const word = args[0];
      let newWord = word;

      for (const key in dictionary) {
        newWord = newWord.replace(key, dictionary[key]);
      }
      return newWord;
    }
  };
}

// /*** Uncomment these to check your work! ***/
const changeScene = censor();
changeScene("dogs", "cats");
changeScene("quick", "slow");
console.log(changeScene("The quick, brown fox jumps over the lazy dogs.")); // => should log 'The slow, brown fox jumps over the lazy cats.'

// CHALLENGE 13
function createSecretHolder(secret) {
  let mySecret = secret;
  const getSecret = () => {
    return mySecret;
  };

  const setSecret = (newSecret) => {
    mySecret = newSecret;
  };
  return {
    getSecret,
    setSecret,
  };
}

// /*** Uncomment these to check your work! ***/
obj = createSecretHolder(5);
obj.getSecret(); // => returns 5
obj.setSecret(2);
obj.getSecret(); // => returns 2

// CHALLENGE 14
function callTimes() {
  let count = 0;

  return () => {
    count++;
    return count;
  };
}

// /*** Uncomment these to check your work! ***/
let myNewFunc1 = callTimes();
let myNewFunc2 = callTimes();
myNewFunc1(); // => 1
myNewFunc1(); // => 2
myNewFunc2(); // => 1
myNewFunc2(); // => 2

// CHALLENGE 15
function russianRoulette(num) {
  let message = "click";
  let numberOfRuns = 0;
  return () => {
    numberOfRuns++;
    if (numberOfRuns < num) {
      return message;
    } else {
      if (num === numberOfRuns) {
        message = "bang";
        return message;
      } else {
        message = "reload to play again";
        return message;
      }
    }
  };
}

// /*** Uncomment these to check your work! ***/
const play = russianRoulette(3);
console.log(play()); // => should log 'click'
console.log(play()); // => should log 'click'
console.log(play()); // => should log 'bang'
console.log(play()); // => should log 'reload to play again'
console.log(play()); // => should log 'reload to play again'

// CHALLENGE 16
function average() {
  const totalNumbers = [];
  let avgTotal = 0;

  return (...args) => {
    const currentNumber = args[0];

    if (!currentNumber) {
      if (!totalNumbers.length) {
        return totalNumbers.length;
      } else {
        return avgTotal;
      }
    } else {
      totalNumbers.push(currentNumber);
    }

    avgTotal =
      totalNumbers.reduce((prev, current) => {
        return prev + current;
      }, 0) / totalNumbers.length;
    return avgTotal;
  };
}

// /*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // => should log 0
console.log(avgSoFar(4)); // => should log 4
console.log(avgSoFar(8)); // => should log 6
console.log(avgSoFar()); // => should log 6
console.log(avgSoFar(12)); // => should log 8
console.log(avgSoFar()); // => should log 8

// CHALLENGE 17
function makeFuncTester(arrOfTests) {
  const arrOfTestsCopy = [...arrOfTests];

  return (cbf) => {
    let isEqual = true;
    arrOfTestsCopy.forEach((element) => {
      const sameString = cbf(element[0]) === element[1];
      if (!sameString) {
        isEqual = false;
      }
    });
    return isEqual;
  };
}

// /*** Uncomment these to check your work! ***/
const capLastTestCases = [];
capLastTestCases.push(["hello", "hellO"]);
capLastTestCases.push(["goodbye", "goodbyE"]);
capLastTestCases.push(["howdy", "howdY"]);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = (str) => str.toUpperCase();
const capLastAttempt2 = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

// CHALLENGE 18
function makeHistory(limit) {
  const wordHistory = [];
  return (word) => {
    if (word === "undo") {
      if (wordHistory.length) {
        return `${wordHistory.pop()} undone`;
      } else {
        return "nothing to undo";
      }
    } else {
      wordHistory.push(word);
      return `${word} done`;
    }
  };
}

// /*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions("jump")); // => should log 'jump done'
console.log(myActions("undo")); // => should log 'jump undone'
console.log(myActions("walk")); // => should log 'walk done'
console.log(myActions("code")); // => should log 'code done'
console.log(myActions("pose")); // => should log 'pose done'
console.log(myActions("undo")); // => should log 'pose undone'
console.log(myActions("undo")); // => should log 'code undone'
console.log(myActions("undo")); // => should log 'walk undone'
console.log(myActions("undo")); // => should log 'nothing to undo'

// CHALLENGE 19
function blackjack(array) {
  const blackjackArray = [...array];
  return function dealer(num1, num2) {
    const result = num1 + num2;
    let numberInvk = 0;
    let isPlayerBusted = false;
    let blacjackResult = result;
    return function player() {
      if (blackjackArray.length) {
        if (!numberInvk) {
          numberInvk++;
          return result;
        } else {
          if (!isPlayerBusted) {
            blacjackResult += blackjackArray.shift();
            if (blacjackResult <= 21) {
              return blacjackResult;
            } else {
              isPlayerBusted = true;
              return "bust";
            }
          } else {
            return "you are done";
          }
        }
      } else {
        return "No cards on deck";
      }
    };
  };
}

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
const deal = blackjack([
  2,
  6,
  1,
  7,
  11,
  4,
  6,
  3,
  9,
  8,
  9,
  3,
  10,
  4,
  5,
  3,
  7,
  4,
  9,
  6,
  10,
  11,
]);

// /*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // => should log 9
console.log(i_like_to_live_dangerously()); // => should log 11
console.log(i_like_to_live_dangerously()); // => should log 17
console.log(i_like_to_live_dangerously()); // => should log 18
console.log(i_like_to_live_dangerously()); // => should log 'bust'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

// /*** BELOW LINES ARE FOR THE BONUS ***/

// /*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // => should log 4
console.log(i_TOO_like_to_live_dangerously()); // => should log 15
console.log(i_TOO_like_to_live_dangerously()); // => should log 19
console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

// /*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
