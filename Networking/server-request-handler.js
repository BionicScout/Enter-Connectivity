import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs";

import {contactCreate,separateContacts,textContact, outputContacts, dateToText, textToDate} from "./contact.js";
import {doesFileExist, readContacts, writeContacts} from "./read-write.js";

//Utility Fuctions and Variables
const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

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
export function htmlPageRequest(req, res){
    const filePath = path.join(__dirname, "Web_Pages", req.url);
    console.log(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found - ' + err.message);
        } else {
            // Determine the content type based on file extension
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

//Backend Request Handling
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
        let contact= contactCreate(
            receivedData.name, 
            /*receivedData.bday*/ new Date(),
            receivedData.email,
            receivedData.phone,
            /*receivedData.last_contact*/ new Date(),
            receivedData.contact_interval
        );
            
        let dataTXT = textContact(contact);
        writeContacts(receivedData.username, receivedData.password, dataTXT);

        //Respond to the client
        const responseData = { message: 'Server Respone - Contact Created!' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));

        console.log("\n");
    });        
}

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