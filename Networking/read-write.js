import error from "console";
import fs from "fs";
import readline from "readline"

const fs = require('fs');

export async function readContacts(username, password){
  const fileStream = fs.createReadStream("./Contacts/"+username+".txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  var data = [];
  let it = 0;
   for await (const line of rl) {
    if(it==0){
        if(password == line){
            console.log("Password Accepted");
            it++;
            continue;
        }else{
            console.log("Incorrect Password");
            break;
        }
    }
    data.push(line)
  }
  return data;
}


export function writeContacts(username, password,data){
    console.log("In contact");

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