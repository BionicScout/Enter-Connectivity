import {contactCreate,textContact} from "./contact.js";
import {readContacts, writeContacts} from "./read-write.js";
const d = new Date("1985-03-24");
const d2 = new Date("2023-03-24");
const john = contactCreate("Johnathan",d,"Johnathan@gmail.com","615-233-1233",d2,30)
const dataTXT = textContact(john);
writeContacts("Barry","Do it again",dataTXT);
data = readContacts("Barry","Do it again")