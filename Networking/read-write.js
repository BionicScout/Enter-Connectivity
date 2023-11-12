import error from "console";
import fs from "fs";
import readline from "readline"
export async function readContacts(username, password){
  const fileStream = fs.createReadStream("./Contacts/"+username+".txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const data = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    data.push(line)
    console.log(data);
  }
  return data;
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