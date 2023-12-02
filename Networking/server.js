import http from "http";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import {htmlPageRequest, writeContact} from "./server-request-handler.js";

const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const server = http.createServer((req, res) => {
    cors();

    console.log("Request Made");
    console.log(req.url, req.method);
    

    //Select Correct Request
    if(req.url == "/Networking/writeContact"){
        writeContact(req, res);
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