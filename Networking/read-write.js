import error from "console";
import fs from "fs";
import readline from "readline"


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


export async function writeContacts(username, password,data){
    console.log("In contact");

    let filename = "./Contacts/" + username + ".txt";

    if(fs.existsSync(filename)){
        await fs.promises.unlink(filename, (err) => {
            if(err){
                console.log(err);
            }
            console.log('file deleted');
        })
    }

    console.log(typeof(password));
    await fs.promises.writeFile(filename, password);
    console.log('file was created');

    await fs.promises.appendFile(filename, data)
    console.log('file was appended');
}