//File System
const { error } = require('console');
const fs = require('fs');

//Reading Files (this is async)
fs.readFile("./fileTest_Folder/fileTest_text.txt", (err, data) => {
    if(err) {
        console.log(err);
    }
    console.log(data.toString());
});
 

//Directories
if(!fs.existsSync('./assets')){ //Create Direrctory if it doesn't exsit
    fs.mkdir('./assets', (err) => { //Async
        if(err){
            console.log(err);
        }
        console.log('folder created');
    })
} else { //If it does exist, remove folder
    fs.rmdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder deleted');
    })
}

//Writing and Deleting Files (async)
if(fs.existsSync("./fileTest_Folder/deleteMe.txt")){
    fs.unlink("./fileTest_Folder/deleteMe.txt", (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
} else{
    fs.writeFile("./fileTest_Folder/deleteMe.txt", "Hello World!", () => {
        console.log('file was created');
    })
}