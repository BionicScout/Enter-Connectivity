import http from "http";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import {checkPassword, checkUsername, createProfile, getContacts, htmlPageRequest, writeContact} from "./server-request-handler.js";

const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const server = http.createServer((req, res) => {
    cors();

    console.log("Request Made");
    console.log(req.url, req.method);
    //console.log(req.socket);

    //Select Correct Request
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
    else if(req.url == '/Networking/getContacts'){
        getContacts(req, res);
        return true
    }
   
    return false;
}