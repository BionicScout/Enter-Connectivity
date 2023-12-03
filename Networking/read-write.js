import error from "console";
import fs from "fs";
import readline from "readline";

import {separateContacts, textContact} from "./contact.js";

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
            data.push(false)
            break;
        }
    }
    data.push(line)
  }

  console.log("DATA: " + data);
  return data;
}

/**
 * writeContacts simple writes all the contacts to the console.
 * @param {string} username
 * @param {string} password
 * @param {array} data
 */
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

export async function addContact(username, password, newContact){
    console.log("\nAdd Contact");
    //Get Old Contacts
    let data = await readContacts(username, password);
    let contactList = separateContacts(data);

    //Turn Old contacts into string
    let newList = "";
    for(let i = 0; i < contactList.length; i++){
        newList += textContact(contactList[i]);
    }

    console.log("Contact List: " + contactList);

    //Add New contact and Save data
    newList += newContact;
    await writeContacts(username, password, newList);
}

export function doesFileExist(filename){
    if(fs.existsSync(filename)){
        return true;
    }
    return false;
}