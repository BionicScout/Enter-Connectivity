//Entire Export
const xyz = require("./people"); //Saves module.export and runs people.js

console.log(xyz.ages);

//Specific Export
const {people, ages} = require("./people"); 

console.log(people, ages);

//Operating System Info
const os = require('os');

console.log(os.platform(), os.homedir());