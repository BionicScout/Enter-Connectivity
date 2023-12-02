import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs";

import {contactCreate,separateContacts,textContact, outputContacts, dateToText, textToDate} from "./contact.js";
import {readContacts, writeContacts} from "./read-write.js";

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

export function getAllContacts(req, res){


}