import error from "console";
import fs from "fs";
export function readContacts(username, password){
  fs.readFile("./Contacts/"+username+".txt", (err, data) => {
    if(err) {
        console.log(err);
    }
    console.log(data.toString());
});
}

export function writeContacts(username, password,data){
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
    fs.appendFile("./Contacts/"+username+".txt",data, () => {
        console.log('file was created');
    })
}