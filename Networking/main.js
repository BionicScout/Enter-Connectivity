import {contactCreate,separateContacts,textContact, outputContacts, dateToText, textToDate} from "./contact.js";
import {readContacts, writeContacts} from "./read-write.js";
let bday = new Date("1985-03-24");
let contacted = new Date("2023-06-28");
//let bday = dateToText(bday1);
//let contacted = dateToText(contacted1);
//console.log(bday,contacted);
//console.log(textToDate(bday));
/*let year = bday.getFullYear;
let month = bday.getMonth;
let day = bday.getDay;*///{year,month,day}


const john = contactCreate("Johnathan",bday,"Johnathan@gmail.com","615-233-1233",contacted,30);
const john2 = contactCreate("Johnathan2",bday,"Johnathan@gmail.com","615-233-1233",contacted,30);
let  dataTXT = textContact(john);
dataTXT+=textContact(john2);
writeContacts("Barry","Do it again",dataTXT);
console.log("Read Contacts");
var  data = await readContacts("Barry","Do it again");
console.log(data);
console.log("Separate Contacts");
var  info = separateContacts(data);
//outputContacts(info);
console.log(info)
