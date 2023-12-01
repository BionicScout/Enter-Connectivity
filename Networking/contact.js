export function contactCreate(nameIn, birthdayIn, emailIn, phoneIn, lastContactedIn, contactFequencyIn){
const contact = {name:nameIn, birthday:dateToText(birthdayIn), email:emailIn, phone:phoneIn, lastContacted:dateToText(lastContactedIn), contactFequency:contactFequencyIn}
return contact;
}

export function dateToText(date){
return (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1)).toString();
}

export function textToDate(dateText){
  let temp = new Date(dateText);
  temp.setDate(temp.getDate()-1);
  return temp;

}


export function textContact(contact){
const text = "\n"+contact.name.toString()+"\n"+(contact.birthday.toString())+"\n"+contact.email.toString()+"\n"+contact.phone.toString()+"\n"+(contact.lastContacted.toString())+"\n"+contact.contactFequency.toString();
return text;
}

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

export function outputContacts(data){
  let i = 1;
  console.log(data.length)
  while (i < data.length) {
    console.log("Contact #",i);
    console.log(data[i].name);
    i++;
}
}