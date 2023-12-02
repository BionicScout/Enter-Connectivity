import error from "console";
import fs from "fs";
import readline from "readline"

/**
 * readContacts reads all the information in the text file that uses username as a name.
 * It checks whether the password (first line of said file) is the same as inputted.
 * If it is, it will return an array of strings containing all the information
 * @param {string} username
 * @param {string} password
 * @returns array of strings
 */
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

/**
 * writeContacts simple writes all the contacts to the console.
 * @param {string} username
 * @param {string} password
 * @param {array} data
 */
export async function writeContacts(username, password, data){
  if(fs.existsSync("./Contacts/"+username+".txt")){
    fs.unlink("./Contacts/"+username+".txt", (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}

    await fs.writeFile("./Contacts/"+username+".txt",password, () => {
        console.log('file was created');
    })
    await fs.appendFile("./Contacts/"+username+".txt",data, () => {
        console.log('file was appended');
    })
}