import {contactCreate,textContact} from "./contact.js";
import {readContacts, writeContacts} from "./read-write.js";
const d = new Date("1985-03-24");
const d2 = new Date("2023-03-24");
const john = contactCreate("Johnathan",d,"Johnathan@gmail.com","615-233-1233",d2,30)
const dataTXT = textContact(john);
writeContacts("Barry","Do it again",dataTXT);
data = readContacts("Barry","Do it again")



///Roman

const whoToContact = () => {
    //Get List of contacts
        const contactList = getContacts();
    
    //Search Through List to Seen when last contacted and compare to update frequencey, 
        const peopleToContact = [];
    
        for(let i = 0; i < contactList.length; i++){
            var contact = contactList[i];
            if(needsContact(contact.lastContacted, contact.contactFequency)){
                peopleToContact.push({name:contact.name, birthday:contact.birthday, email:contact.email, phone:contact.phone, 
                    lastContacted:contact.lastContacted, contactFequency:contact.contactFequency});
            }
        }
    
    
        return peopleToContact;
    }
    
    
    const getContacts = () => {
        const people = [];
        people.push({name:"Roman", birthday:"IDC", email:"IDC", phone:"IDC", lastContacted:new Date("10-15-2023"), contactFequency:3});
        people.push({name:"Milan", birthday:"IDC", email:"IDC", phone:"IDC", lastContacted:new Date("10-15-2023"), contactFequency:60});
        people.push({name:"Mel", birthday:"IDC", email:"IDC", phone:"IDC", lastContacted:new Date("11-10-2023"), contactFequency:30});
        return people;
    }
    
    const needsContact = (lastContactedDate, daysToContact) => {
    let dateOffset = (24*60*60*1000) * daysToContact; 
    let contactDate = new Date(new Date().getTime() - dateOffset);
    
    if (contactDate < lastContactedDate) {
        return true;
    } 
    
    return false;
    }
    
    const peopleToContact2 = whoToContact();
    
    for(let i = 0; i < peopleToContact2.length; i++){
        console.log("Contact: " + peopleToContact2[i].name);
    }