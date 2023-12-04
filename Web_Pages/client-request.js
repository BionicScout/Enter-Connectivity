//Request functions
async function requestCheckPassword(username, password){
    //Create Options for Request
    let dataToSend = {
        username: username,
        password: password
    }

    let options = getOptions(dataToSend);
    console.log("Data:\n" + options.body);

    //Send Request to Server
    console.log("Server Request");

    var matchingInfo;
    await fetch('/Networking/checkPassword', options)
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            matchingInfo = data.match;
        })
        .catch(error => console.error('Fetch error:', error));

    //Return bool value
    return matchingInfo;
}

async function requestCheckUsername(username){
    //Create Options for Request
    let options = getOptions({ username: username });
    console.log("Data:\n" + options.body);

    //Send Request to Server
    console.log("Server Request");

    var usernameAvailable;
    await fetch('/Networking/checkUsername', options)
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            usernameAvailable = data.match;
        })
        .catch(error => console.error('Fetch error:', error));

    //Return bool value
    return usernameAvailable;
}

async function requestCreateProfile(username, password){
    //Create Options for Request
    let dataToSend = { 
        username: username,
        password: password 
    }

    let options = getOptions(dataToSend);
    console.log("Data:\n" + options.body);

    //Send Request to Server
    console.log("Server Request");

    await fetch('/Networking/createProfile', options)
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            usernameAvailable = data.match;
        })
        .catch(error => console.error('Fetch error:', error));
}

async function requestContacts(username, password){
    //Create Options for Request
    let dataToSend = { 
        username: username,
        password: password 
    }

    let options = getOptions(dataToSend);
    console.log("Data:\n" + options.body);

    //Send Request to Server
    console.log("Server Request");

    var contactList;
    await fetch('/Networking/getContacts', options)
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            contactList = data.list;
        })
        .catch(error => console.error('Fetch error:', error));

    return contactList;
}

async function requestWriteContact(dataToSend){
    let options = getOptions(dataToSend);
    console.log("Data:\n" + options.body);

    //Send Request to Server
    console.log("Server Request");

    await fetch('/Networking/writeContact', options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Fetch error:', error));
}



//Utility Functions
function getOptions(dataToSend){
    let options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    }

    return options;
}

function stringToDate(dateAsString){
    //Get Year, month, and year
    let year = dateAsString.substring(0, 4);
    let month = dateAsString.substring(5, dateAsString.lastIndexOf("-"));
    let day = dateAsString.substring(dateAsString.lastIndexOf("-") + 1, dateAsString.length);

    //Convert to date
    let date = new Date(year, month - 1, day);
    return date;
}

function dateToString(date){
    let string = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
    return string;
}