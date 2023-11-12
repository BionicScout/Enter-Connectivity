export function contactCreate(nameIn, birthdayIn, emailIn, phoneIn, lastContactedIn, contactFequencyIn){
const contact = {name:nameIn, birthday:birthdayIn, email:emailIn, phone:phoneIn, lastContacted:lastContactedIn, contactFequency:contactFequencyIn}
return contact;
}


export function textContact(contact){
const text = "\n"+contact.name.toString()+"\n"+contact.birthday.toString()+"\n"+contact.email.toString()+"\n"+contact.phone.toString()+"\n"+contact.lastContacted.toString()+"\n"+contact.contactFequency.toString();
return text;
}