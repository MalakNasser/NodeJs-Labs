const myMod = require("./Modules/myModule.js");

const eventEmitter = myMod.EventEmitter;

const myObj = new eventEmitter();

myObj.on("userLoggedIn", (username) => {
  console.log(`${username} has logged in.`);
});

myObj.on("userLoggedOut", (username) => {
  console.log(`${username} has logged out.`);
});

myObj.emit("userLoggedIn", "Malak");
myObj.emit("userLoggedOut", "Malak");
