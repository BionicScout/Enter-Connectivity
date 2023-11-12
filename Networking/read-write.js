const { error } = require('console');
const fs = require('fs');

writeContacts("john","pass")

function readContacts(username, password){
  fs.readFile("./Contacts/"+username+".txt", (err, data) => {
    if(err) {
        console.log(err);
    }
    console.log(data.toString());
});
}

function writeContacts(username, password){
  if(fs.existsSync("./Contacts/"+username+".txt")){
    fs.unlink("./Contacts/"+username+".txt", (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}

    fs.writeFile("./Contacts/"+username+".txt",password, () => {
        console.log('file was created');
    })
}