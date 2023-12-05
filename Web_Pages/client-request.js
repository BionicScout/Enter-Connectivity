//Request functions
/*
    This function takes in the username and password then sends a request ('/Networking/checkPassword') to the Server. Then the request sends a boolean 
    value that represnts if the password matches the username or not.
    @param username - username of account
    @param password - password that belongs to username
    @return - a bool if true means password matches, if false means password doesn't match
*/
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

/*
    This function takes in the username and then sends a request ('/Networking/checkUsername') to the Server. Then the request snds a boolean value that
    represnts if the username is taken or not.
    @param username - username of account
    @return - a bool if true means username is not in use, if false means username already exists
*/
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

/*
    This function takes in the password and user name and then sends a request ('/Networking/createProfile') 
    to the Server. This request creates a new file for the user and saves the password. 
    @param username - username of account
    @param password - password that belongs to username
*/
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

/*
    This function sends a request to the server ('/Networking/getContacts') to get a list of all contacts belonging to the user requested. 
    @param username - username of account
    @param password - password that belongs to username
    @return - A list of contacts belonging to username.
*/
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

/*
    This function takes in the information of the contact with password and user name and then sends a request ('/Networking/editContact') 
    to the Server. This request edits a previous contact info.
    @param dataToSend - A json containing username, password, id of contact to change, and all contact information.
*/
async function requestEditContact(dataToSend){
    let options = getOptions(dataToSend);
    console.log("Data:\n" + options.body);

    //Send Request to Server
    console.log("Server Request");

    await fetch('/Networking/editContact', options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Fetch error:', error));
}

/*
    This function takes in the information of the contact with password and user name and then sends a request ('/Networking/writeContact') 
    to the Server. This request stores the contact info.
    @param dataToSend - A json containing username, password, and all contact information.
*/
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
/*
    This function function creates the options for the fetch requests. The options are set up to use a POST request as most request need to send 
    senstive data, a header with the type of content (a json), and the body which holds a json turned into a string. The options is returned. 
    @param dataToSend - A json with the information needed to send.
    @return - A jason called options with the POST request and data to send.
*/
function getOptions(dataToSend){
    let options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    }

    return options;
}

/*
    This function takes string variable from an http request and then converts it into a Date variable
    @param dateAsString - tring variable from an http request
    @return - A Date variable matching dateAsString
*/
function stringToDate(dateAsString){
    //Get Year, month, and year
    let year = dateAsString.substring(0, 4);
    let month = dateAsString.substring(5, dateAsString.lastIndexOf("-"));
    let day = dateAsString.substring(dateAsString.lastIndexOf("-") + 1, dateAsString.length);

    //Convert to date
    let date = new Date(year, month - 1, day);
    return date;
}


/*
    This function takes a Date variable and turns it into a string accepted by the html inputs
    @param Date - a Date Variable
    @return - A string in the format of YYYY-MM-DD
*/
function dateToString(date){
    let string = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
    return string;
}