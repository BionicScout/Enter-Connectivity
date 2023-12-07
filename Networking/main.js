/**
 * THIS IS A BOILERPLATE TEST SCENARIO
 */
//Import all the necessary functions
import {contactCreate,separateContacts,textContact, outputContacts, dateToText, textToDate} from "./contact.js";
import {readContacts, writeContacts} from "./read-write.js";

//Create date variables
let bday = new Date("1985-03-24");
let contacted = new Date("2023-06-28");

//Create two contacts
const john = contactCreate("Johnathan",bday,"Johnathan@gmail.com","615-233-1233",contacted,30);
const john2 = contactCreate("Johnathan2",bday,"Johnathan@gmail.com","615-233-1233",contacted,30);

//Prepare to save contacts to files by switching to strings
let  dataTXT = textContact(john);
dataTXT+=textContact(john2);

//Write the information to the file Barry.txt with the password Test
writeContacts("Barry","Test",dataTXT);

//Read all the contacts from Barry.txt using the password Test
console.log("Read Contacts");
var  data = await readContacts("Barry","Test");
console.log(data);

//Separate the contacts into individual dictionaries
console.log("Separate Contacts");
var  info = separateContacts(data);

//Display all contacts
console.log(info)
