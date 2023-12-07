import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs";

import {contactCreate, separateContacts, textContact, outputContacts, dateToText, textToDate} from "./contact.js";
import {addContact, doesFileExist, readContacts, editContact, writeContacts} from "./read-write.js";

//Utility Fuctions and Variables
const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url))); //Gets Project Folder Path


/**
    This function takes in the path of the file and returns a string represnting the type of file.
    @param filePath - the path to the file
    @return - a string holding the file type of the file
*/
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.jpeg':
        case '.jpg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        default:
            return 'application/octet-stream';
    }
}


//Wep Page Request

/**
    This function request a specific html page and returns all element for the page: including images, js files/functions, and other html files.
    @param req - This variable holds all information for the request.
    @param res - This variable stores all information needing to be sent back to front-end.
*/
export function htmlPageRequest(req, res){
    //Get path to file
    const filePath = path.join(__dirname, "Web_Pages", req.url);
    console.log(filePath);

    //For each file in an html page (jpeg, png, js scripts, other html pages), load information into write head
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 File not found - ' + err.message);
        } else {
            // Determine the content type based on file extension
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

//Backend Request Handling

/**
    This function request takes in contact information along with username and password and adds the user's contact to end of the contact list.
    @param req - This variable holds all information for the request.
    @param res - This variable stores all information needing to be sent back to front-end.
*/
export function writeContact(req, res){
    //Get Data
    let incomingData = "";

    req.on('data', chunk => {
        incomingData += chunk.toString();
    });

    //Once Data is collected, use it
    req.on('end', () => {
        //Turn Data to JSON
        console.log("Received Data:")
        console.log(incomingData)
        const receivedData = JSON.parse(incomingData);
        console.log(receivedData);

        //Create Contact
        let contact = contactCreate(
            receivedData.name,
            new Date(receivedData.bday),
            receivedData.email,
            receivedData.phone,
            new Date(receivedData.last_contact),
            receivedData.contact_interval
        );

        let dataTXT = textContact(contact);
        addContact(receivedData.username, receivedData.password, dataTXT);

        //Respond to the client
        const responseData = { message: 'Server Respone - Contact Created!' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));

        console.log("\n");
    });
}

/**
    This function request changes a previous contact. To do this the request send the username, password, id, and updated contact info and then it will
    delete the old contact and add the updated one at the end. The id represents wich contact to delete.
    @param req - This variable holds all information for the request.
    @param res - This variable stores all information needing to be sent back to front-end.
*/
export function updateContact(req, res){
    //Get Data
    let incomingData = "";

    req.on('data', chunk => {
        console.log("DATA AREA");
        incomingData += chunk.toString();
    });

    //Once Data is collected, use it
    req.on('end', () => {
        console.log("END AREA");
        //Turn Data to JSON
        console.log("Received Data:")
        console.log(incomingData)
        const receivedData = JSON.parse(incomingData);
        console.log(receivedData);

        //Create Contact
        let contact = contactCreate(
            receivedData.name,
            new Date(receivedData.bday),
            receivedData.email,
            receivedData.phone,
            new Date(receivedData.last_contact),
            receivedData.contact_interval
        );

        let dataTXT = textContact(contact);
        console.log("User: " + receivedData.username);
        console.log("Pass: " + receivedData.password);
        console.log("ID: " + receivedData.id);
        editContact(receivedData.username, receivedData.password, receivedData.id, dataTXT);
        console.log("Here");

        //Respond to the client
        const responseData = { message: 'Server Respone - Contact Created!' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));

        console.log("\n");
    });
}


/**
    This function request the server to checks if the password matches a username. this first checks if the username exists and then it check if the
    password is right. If the username doesn't exist or if the passwor doesn't match, a bool failed is returned in respone. Otherwise it is true.
    @param req - This variable holds all information for the request.
    @param res - This variable stores all information needing to be sent back to front-end.
*/
export function checkPassword(req, res){
    //Get Data
    let incomingData = "";

    req.on('data', chunk => {
        incomingData += chunk.toString();
    });

    //Once Data is collected, use it
    req.on('end', async () => {
        //Turn Data to JSON
        console.log("Incoming Data:\n" + incomingData + "\n" + typeof(incomingData));
        const receivedData = JSON.parse(incomingData);
        console.log("Username: " + receivedData.username);
        console.log("Password: " + receivedData.password);

        //Check if User Name is there
        if(doesFileExist("./Contacts/"+ receivedData.username +".txt")){
        //Check Password Match

            var data = await readContacts(receivedData.username, receivedData.password);
            console.log(data);
            console.log(data[0]);

            var passwordMatch;
            if(data[0] == false)
                passwordMatch = false;
            else
                passwordMatch = true;


            //Respond to the client
            const responseData = { message: 'Server Respone - Password match (' + passwordMatch + ')', match: passwordMatch };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseData));
        }
        else{
            const responseData = { message: 'Server Respone - Username does not exist', match: passwordMatch };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseData));
        }

        console.log("\n");
    });
}

/**
    This function request checks if a username exist. If the username does exist, it returns true, if not it returns false.
    @param req - This variable holds all information for the request.
    @param res - This variable stores all information needing to be sent back to front-end.
*/
export function checkUsername(req, res){
    //Get Data
    let incomingData = "";

    req.on('data', chunk => {
        incomingData += chunk.toString();
    });

    //Once Data is collected, use it
    req.on('end', async () => {
        //Turn Data to JSON
        console.log("Incoming Data:\n" + incomingData + "\n" + typeof(incomingData));
        const receivedData = JSON.parse(incomingData);
        console.log("Username: " + receivedData.username);

        //Check if User Name is there
        if(doesFileExist("./Contacts/"+ receivedData.username +".txt")){
            const responseData = { message: 'Server Respone - Username is not available', match: false };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseData));
        }
        else{
            const responseData = { message: 'Server Respone - Username is available', match: true };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseData));
        }


        console.log("\n");
    });
}

/**
    This function request creates a new profile. To do this, the request creates a new contact file and then writes the password to the top line of the file.
    @param req - This variable holds all information for the request.
    @param res - This variable stores all information needing to be sent back to front-end.
*/
export function createProfile(req, res){
    //Get Data
    let incomingData = "";

    req.on('data', chunk => {
        incomingData += chunk.toString();
    });

    //Once Data is collected, use it
    req.on('end', () => {
        //Turn Data to JSON
        console.log("Received Data:")
        console.log(incomingData)
        const receivedData = JSON.parse(incomingData);
        console.log(receivedData);

        //Create Profile
        writeContacts(receivedData.username, receivedData.password, "");

        //Respond to the client
        const responseData = { message: 'Server Respone - Profile Created!' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));

        console.log("\n");
    });
}

/**
    This function request ask to get all the contacts for one user. To do this, the server reader the user's file (after checkin the password is right)
    and then saves all the contacts as json in res, which is returned to the server.
    @param req - This variable holds all information for the request.
    @param res - This variable stores all information needing to be sent back to front-end.
*/
export function getContacts(req, res){
    //Get Data
    let incomingData = "";

    req.on('data', chunk => {
        incomingData += chunk.toString();
    });

    //Once Data is collected, use it
    req.on('end', async () => {
        //Turn Data to JSON
        console.log("Received Data:")
        console.log(incomingData)
        const receivedData = JSON.parse(incomingData);
        console.log(receivedData);

        //Create Profile
        let data = await readContacts(receivedData.username, receivedData.password);
        let contactList = separateContacts(data);

        //Respond to the client
        const responseData = { message: 'Server Respone - Got Contacts!', list: contactList};
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));

        console.log("\n");
    });
}