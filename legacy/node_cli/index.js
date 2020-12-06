#! /usr/bin/env node
// node cli 만들기

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.clear();
const answerCallback = (answer) => {
  if (answer === "y") {
    console.log("Thank you");
    rl.close();
  } else if (answer === "n") {
    console.log("Sorry");
    rl.close();
  } else {
    console.clear();
    console.log("Y or N");
    rl.question("예제가 재미있습니까? (y/n)", answerCallback);
  }
};
rl.question("예제가 재미있습니까? (y/n)", answerCallback);
