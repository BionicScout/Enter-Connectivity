console.log('\n');

//Global Object
console.log('Global Object:');
console.log(global);
console.log('\n');

//Get Directory
console.log("__dirname: " + __dirname); //2 unserscrores
console.log('\n');
console.log("__filename: " + __filename);
console.log('\n');

//Intervals and Timeouts
global.setTimeout(() => { 
    console.log('in the timeout');
    clearInterval(int);
    console.log('\n');
}, 5000);

const int = setInterval(() => {
    console.log('interval');
}, 1000); //Use ctrl + c to stop teminal
