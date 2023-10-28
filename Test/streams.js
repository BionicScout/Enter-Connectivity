const fs = require('fs');

const readStream = fs.createReadStream('./streamTest.txt', { encoding: 'utf8'});
const writeStream = fs.createWriteStream('./streamTest2.txt.');

/*/Long Way
readStream.on('data', (chunk) => {
    console.log('----- NEW CHUNK -----');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
})
*/

//Piping
readStream.pipe(writeStream);