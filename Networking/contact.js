/**
 * Takes in parameters and creates a dictionary for that contact using the provided information.
 * @param {string} nameIn
 * @param {Date} birthdayIn
 * @param {string} emailIn
 * @param {string} phoneIn
 * @param {Date} lastContactedIn
 * @param {int} contactFequencyIn
 * @returns {dictionary}
 */
export function contactCreate(nameIn, birthdayIn, emailIn, phoneIn, lastContactedIn, contactFequencyIn){
const contact = {name:nameIn, birthday:dateToText(birthdayIn), email:emailIn, phone:phoneIn, lastContacted:dateToText(lastContactedIn), contactFequency:contactFequencyIn}
return contact;
}

/**
 * Takes in a date variable and formats it for storage as a text variable.
 * @param {Date} date
 * @returns {string}
 */
export function dateToText(date){
return (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1)).toString();
}

/**
 * Takes a string input and returns the date version of that string.
 * @param {string} dateText
 * @returns {Date}
 */
export function textToDate(dateText){
  let temp = new Date(dateText);
  temp.setDate(temp.getDate()-1);
  return temp;

}

/**
 * Turns the data from a dictionary contact variable into text for storage.
 * @param {dictionary} contact
 * @returns {string}
 */
export function textContact(contact){
const text = "\n"+contact.name.toString()+"\n"+(contact.birthday.toString())+"\n"+contact.email.toString()+"\n"+contact.phone.toString()+"\n"+(contact.lastContacted.toString())+"\n"+contact.contactFequency.toString();
return text;
}

/**
 * Takes in a list of string and returns a list of contacts
 * @param {[string]} data
 * @returns {[dictionary]}
 */
export function separateContacts(data){
console.log("Success");
  const contacts = [];
for(let x = 0; x<data.length; x+=6){
  console.log(x);

  console.log(contactCreate(data[x],textToDate(data[x+1]),data[x+2],data[x+3],textToDate(data[x+4]),data[x+5]));
    contacts.push(contactCreate(data[x],textToDate(data[x+1]),data[x+2],data[x+3],textToDate(data[x+4]),data[x+5]));
}
return contacts;
}

/**
 * Outputs all names of contacts from a list of contacts
 * @param {[dictionary]} contacts
 */
export function outputContacts(contacts){
  let i = 1;
  console.log(contacts.length)
  while (i < contacts.length) {
    console.log("Contact #",i);
    console.log(contacts[i].name);
    i++;
}
}