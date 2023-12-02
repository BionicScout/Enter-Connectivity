import http from "http";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import {contactCreate,separateContacts,textContact, outputContacts, dateToText, textToDate} from "./contact.js";
import {readContacts, writeContacts} from "./read-write.js";

const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const server = http.createServer((req, res) => {
    cors();

    console.log("Request Made");
    console.log(req.url, req.method);
    

    //Select Correct Request
    if(req.url == "/Networking/writeContact"){
    //Get Data
        let incomingData = "";

        req.on('data', chunk => {
            incomingData += chunk.toString();
        });

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

                //Dates need converted from HTML to Date
                
            console.log("Contact",contact);
            let dataTXT = textContact(contact);
            //dataTXT+=textContact(john2);
            console.log("DataTXT", dataTXT)
            writeContacts(receivedData.username, receivedData.password, dataTXT);

        
            
            // Respond to the client
            const responseData = { message: 'This is the response from the server' };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseData));

            console.log("\n");

        });
    }
    else{

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


    console.log("\n");
    

   /* //Try localhost:3000/about

    //Set Header type to plain
    //res.setHeader('Content-Type', 'text/plain');
    //res.write('hello, ninjas');

    //Set Header type to html
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    var myReadStream = fs.createReadStream('../Assests/Index-Campfire.jpeg', 'utf8');

    res.writeHead(200, {'Content-Type': 'text/html'});
    myReadStream = fs.createReadStream('../Web Pages/index.html', 'utf8');

    myReadStream.pipe(res);*/
});

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


//(port number, host name, ...)
let port = 4870;
server.listen(port, 'localhost', () => {
    console.log("Listening for request on port " + port);
});