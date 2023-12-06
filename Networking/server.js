import http from "http";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import {checkPassword, checkUsername, createProfile, updateContact, getContacts, htmlPageRequest, writeContact} from "./server-request-handler.js";

const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const server = http.createServer((req, res) => {
    //Cross-Origin Resource Sharing, helps get information from front end
    cors();

    console.log("Request Made");
    console.log(req.url, req.method);

    //Select Html request or backend request
    if(backendDelegator(res, req) == false){
        htmlPageRequest(req, res);
    }    

    console.log("\n");
});

//(port number, host name, ...)
let port = 4870;
server.listen(port, 'localhost', () => {
    console.log("Listening for request on port " + port);
});

//Request information from server-request-handler
function backendDelegator(res, req){
    if(req.url == "/Networking/writeContact"){
        writeContact(req, res);
        return true;
    }
    else if(req.url == '/Networking/checkPassword'){
        checkPassword(req, res);
        return true;
    }
    else if(req.url == '/Networking/checkUsername'){
        checkUsername(req, res);
        return true;
    }
    else if(req.url == '/Networking/createProfile'){
        createProfile(req, res);
        return true
    }
    else if(req.url == "/Networking/editContact"){
        updateContact(req, res);
        return true;
    }
    else if(req.url == '/Networking/getContacts'){
        getContacts(req, res);
        return true
    }
   
    return false;
}