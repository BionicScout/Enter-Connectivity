import http from "http";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import {checkPassword, checkUsername, createProfile, htmlPageRequest, writeContact} from "./server-request-handler.js";

const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const server = http.createServer((req, res) => {
    cors();

    console.log("Request Made");
    console.log(req.url, req.method);
    console.log(req.socket);
    

    //Select Correct Request
    if(req.url == "/Networking/writeContact"){
        writeContact(req, res);
    }
    else if(req.url == '/Networking/checkPassword'){
        checkPassword(req, res);
    }
    else if(req.url == '/Networking/checkUsername'){
        checkUsername(req, res);
    }
    else if(req.url == '/Networking/createProfile'){
        createProfile(req, res);
    }
    else{
        htmlPageRequest(req, res);
    }


    console.log("\n");
});



//(port number, host name, ...)
let port = 4870;
server.listen(port, 'localhost', () => {
    console.log("Listening for request on port " + port);
});